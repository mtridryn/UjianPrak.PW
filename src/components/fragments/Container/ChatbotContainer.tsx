import "@/app/assets/css/chatbot.css";

type Props = {
  children?: any;
};

export default function ChatbotContainer({ children }: Props) {
  return (
    <div className="custom-scrollbar flex max-h-[79vh] flex-col overflow-y-auto">
      <div className="my-auto mb-5 flex min-h-[80vh] flex-col items-center justify-center">
        <p className="my-4 text-[32px] italic text-black">Chat Bot</p>
        <p className="max-w-2xl text-center text-black">
          Get exclusive information about special discounts, tips on choosing
          products that suit your needs, and even consultation on using the app
          to maximize your shopping experience. We are here to guide you every
          step of the way to ensure that online shopping feels safer, easier,
          and of course, more enjoyable!
        </p>
      </div>
      <div className="">
        {children} {/* message list */}
      </div>
    </div>
  );
}
