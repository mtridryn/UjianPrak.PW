from typing import List

from langchain import hub
from langchain.agents import AgentExecutor
from langchain.agents.format_scratchpad import format_log_to_str
from langchain.agents.output_parsers import ReActJsonSingleInputOutputParser
from langchain.tools.render import render_text_description
from langchain.tools.retriever import create_retriever_tool
from langchain_community.chat_models.fireworks import ChatFireworks
from langchain_core.pydantic_v1 import BaseModel

from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_cohere import CohereEmbeddings
from langchain_community.vectorstores import Pinecone as PC
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_community.utilities.tavily_search import TavilySearchAPIWrapper
from pinecone import Pinecone

import os
from retrieval_agent_fireworks.config import settings

MODEL_ID = "accounts/fireworks/models/mixtral-8x7b-instruct"

os.environ["FIREWORKS_API_KEY"] = f"{settings.FIREWORKS_API_KEY}" # AI Model
os.environ['COHERE_API_KEY'] = f"{settings.COHERE_API_KEY}" # Embeddings Model
os.environ["TAVILY_API_KEY"] = f"{settings.TAVILY_API_KEY}"  # Search Engine
os.environ['PINECONE_API_KEY'] = f"{settings.PINECONE_API_KEY}" # Vector Database

# Set up tool(s)
search = TavilySearchAPIWrapper() # timeout=5, retries=3 => 5 detik dan program akan mencoba hingga 3 kali jika permintaan sebelumnya gagal.

description = """"Mesin pencari yang dioptimalkan untuk hasil yang komprehensif, akurat, \
dan terpercaya. Berguna ketika Anda perlu menjawab pertanyaan \
tentang peristiwa terkini atau informasi terbaru. \
Inputnya harus berupa kueri pencarian. \
Jika pengguna menanyakan sesuatu yang Anda tidak ketahui, \
Anda sebaiknya menggunakan alat ini untuk melihat apakah alat ini dapat menyediakan informasi, \
Selalu jawab pertanyaan menggunakan bahasa indonesia, \
Selalu katakan "Mencari di Internet..." di awal jawaban dan berikan paragraf baru untuk jawaban pertama."""

tavily_tool = TavilySearchResults(api_wrapper=search, description=description)

vectorstore_tools_description = (
    "Alat yang mencari dokumentasi tentang Memori Agen."
    "Gunakan alat ini untuk mencari apa saja tentang Agen, Teknik Penyusunan Prompt atau Serangan Adversarial LLM."
    "Diberikan beberapa bagian yang diambil dari dokumen panjang dan sebuah pertanyaan, buat jawaban akhir."
    'Selalu katakan "Terima kasih telah bertanya!" pada Jawaban Akhir.'
    """jika alat ini tidak menyediakan informasi yang relevan cukup katakan "Maaf, Saya Tidak Tahu" pada output"""
    "Selalu jawab pertanyaan menggunakan bahasa indonesia"
    "Gunakan alat lain untuk menyediakan informasi yang relevan melalui mesin pencari"
)

vectordb = Pinecone(
    api_key=os.environ.get("PINECONE_API_KEY")
)

embeddings = CohereEmbeddings(model="embed-multilingual-v3.0")
docsearch = PC.from_existing_index("workshop", embeddings)

retriever = docsearch.as_retriever()

vectorstore_tool = create_retriever_tool(retriever, "docstore", vectorstore_tools_description)

tools = [vectorstore_tool, tavily_tool]

# Set up LLM
llm = ChatFireworks(
    model=MODEL_ID,
    model_kwargs={
        "temperature": 0.5, # 0
        "max_tokens": 2048,
        "top_p": 1,
    },
    cache=True,
)

# setup ReAct style prompt
prompt = hub.pull("hwchase17/react-json")
prompt = prompt.partial(
    tools=render_text_description(tools),
    tool_names=", ".join([t.name for t in tools]),
)

# define the agent
model_with_stop = llm.bind(stop=["\nObservation"])

agent = (
    {
        "input": lambda x: x["input"],
        "agent_scratchpad": lambda x: format_log_to_str(x["intermediate_steps"]),
    }
    | prompt
    | model_with_stop
    | ReActJsonSingleInputOutputParser()
)


class InputType(BaseModel):
    input: str


# instantiate AgentExecutor
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    handle_parsing_errors=True,
).with_types(input_type=InputType)