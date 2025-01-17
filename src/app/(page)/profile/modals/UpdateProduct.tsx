import { Button } from "@/components/ui/button";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleRight,
  faCircleInfo,
  faFileCirclePlus,
  faHeadphones,
  faKeyboard,
  faLaptop,
  faMobile,
  faPersonRunning,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProductByProductId } from "@/app/api/product/detail_product";
import Product from "@/app/lib/model/product";
import { useParams, usePathname, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import updateDataProduct from "@/app/api/product/update_product";
import { randomUUID } from "crypto";
import { Plus } from "lucide-react";

interface productType {
  name: string;
  icon: IconProp;
}
interface FormVC {
  variants: string[];
  colors: string[];
  variantInput: string;
  colorInput: string;
}

export default function UpdateProduct({
  productId,
}: {
  productId: string | string[] | undefined;
}) {
  const [data, setData] = useState<Product | null>(null);
  const [productTypeVal, setProductTypeVal] = useState<string>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [formVC, setFormVC] = useState<FormVC>({
    variants: [],
    colors: [],
    variantInput: "",
    colorInput: "",
  });

  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<Product>({
    defaultValues: {
      category: "",
      image_url: "",
      price: 0,
      quantityInStock: 0,
      name: "",
      description: "",
      variant: [],
      color: [],
    },
  });

  const productType: productType[] = [
    { name: "Electronic", icon: faMobile },
    { name: "Accessories", icon: faHeadphones },
    { name: "Sports", icon: faPersonRunning },
    { name: "Clothes", icon: faShirt },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const dataProduct = await getProductByProductId(productId);
      setData(dataProduct);
      setProductTypeVal(dataProduct?.category);

      if (dataProduct) {
        setValue("category", dataProduct.category);
        setValue("image_url", dataProduct.image_url);
        setValue("price", dataProduct.price);
        setValue("quantityInStock", dataProduct.quantityInStock);
        setValue("name", dataProduct.name);
        setValue("description", dataProduct.description);
        setImagePreview(`/assets${dataProduct.image_url}`);
        setFormVC((prev) => ({
          ...prev,
          variants: dataProduct.variant || [],
          colors: dataProduct.color || [],
        }));
      }
    };
    fetchData();
  }, [productId]);

  const onSubmit: SubmitHandler<Product> = async (dataSubmit) => {
    try {
      if (!data) {
        console.error("Product data is not available");
        return;
      }

      const { product_id } = data;
      const imageUrl = filename
        ? `/image/product/${filename}`
        : dataSubmit.image_url;

      await updateDataProduct(
        product_id,
        dataSubmit.name,
        Number(dataSubmit.price),
        Number(dataSubmit.quantityInStock),
        dataSubmit.category,
        dataSubmit.description,
        imageUrl,
        formVC.variants,
        formVC.colors,
      );
      router.replace("/profile/list-product");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("image_url", `/image/product/${file.name}`);

      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload-product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      setFilename(result.filename);
    }
  };

  const handleProductType = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string,
  ) => {
    e.preventDefault();
    setProductTypeVal(type);
    setValue("category", type);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "variant" | "color",
  ) => {
    setFormVC((prev) => ({
      ...prev,
      [`${type}Input`]: e.target.value,
    }));
  };

  const handleAddItem = (type: "variant" | "color") => {
    const inputValue = formVC[`${type}Input`];
    if (inputValue) {
      setFormVC((prev) => ({
        ...prev,
        [type + "s"]: [...prev[(type + "s") as keyof FormVC], inputValue],
        [`${type}Input`]: "",
      }));
    }
  };

  const handleDeleteItem = (type: "variant" | "color", index: number) => {
    setFormVC((prev) => {
      const updatedItems = prev[`${type}s`].filter((_, i) => i !== index);
      return {
        ...prev,
        [`${type}s`]: updatedItems,
      };
    });
  };

  return (
    <div className="m-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="mx-2 mt-8 space-y-6">
          <li className="flex items-center gap-3 border-b-2 pb-5">
            <FontAwesomeIcon icon={faCircleInfo} />
            <p>Update Product</p>
            <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
          </li>
          <li className="grid items-center justify-between gap-3 border-b-2 py-5">
            <p>Product Type</p>
            <div className="flex space-x-3">
              {productType.map((type, index) => (
                <Button
                  variant={`outline`}
                  key={index}
                  className={`m-0 grid size-28 flex-1 items-center justify-normal gap-0 whitespace-normal py-5 ${productTypeVal === type.name && "bg-blue-500 text-white"}`}
                  onClick={(e) => handleProductType(e, type.name)}
                >
                  <FontAwesomeIcon icon={type.icon} />
                  <p className="text-left">{type.name}</p>
                  <Input type="hidden" {...register("category")}></Input>
                </Button>
              ))}
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <p>Product Media</p>
            <div className="flex space-x-3">
              {imagePreview ? (
                <Image
                  priority
                  src={imagePreview}
                  alt="preview image"
                  height={100}
                  width={100}
                  className="object-cover"
                />
              ) : (
                <p>No Image Available</p>
              )}
              <div className="flex items-center">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded text-[13px] text-blue-500 duration-300 hover:text-blue-600">
                  <FontAwesomeIcon
                    icon={faFileCirclePlus}
                    className="text-3xl"
                  />
                  Upload Image
                  <input
                    type="file"
                    {...register("image_url")}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="price" className="text-base">
                  Price
                </Label>
                <Input
                  {...register("price")}
                  type="number"
                  id="price"
                  placeholder="Input as number..."
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="stock" className="text-base">
                  Stock
                </Label>
                <Input
                  {...register("quantityInStock")}
                  type="number"
                  id="stock"
                  placeholder="stock..."
                />
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name" className="text-base">
                  Product Name
                </Label>
                <Input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="product name..."
                />
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <div className="grid gap-1.5">
              <Label htmlFor="variant" className="text-base">
                Variant
              </Label>
              <div className="flex w-full items-center gap-3">
                <Input
                  value={formVC.variantInput}
                  onChange={(e) => handleInputChange(e, "variant")}
                  type="text"
                  id="variant"
                  placeholder="product variant..."
                />
                <Button
                  type="button"
                  onClick={() => handleAddItem("variant")}
                  variant={"outline"}
                  className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                >
                  <Plus />
                </Button>
              </div>
              <div className="">
                {formVC.variants.map((variant, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={"outline"}
                    onClick={() => handleDeleteItem("variant", index)}
                    className={`m-2 hover:bg-red-500 hover:text-white`}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <div className="grid gap-1.5">
              <Label htmlFor="name" className="text-base">
                Color
              </Label>
              <div className="flex w-full items-center gap-3">
                <Input
                  value={formVC.colorInput}
                  onChange={(e) => handleInputChange(e, "color")}
                  type="text"
                  id="color"
                  placeholder="product color..."
                />
                <Button
                  type="button"
                  onClick={() => handleAddItem("color")}
                  variant={"outline"}
                  className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                >
                  <Plus />
                </Button>
              </div>
              <div className="">
                {formVC.colors.map((color, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={"outline"}
                    onClick={() => handleDeleteItem("color", index)}
                    className={`m-2 hover:bg-red-500 hover:text-white`}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="brand-name" className="text-base">
                  Description
                </Label>
                <Textarea
                  placeholder="Add Description Here..."
                  id="brand-name"
                  {...register("description")}
                  className="h-60"
                />
              </div>
            </div>
          </li>
          <li className="flex items-center justify-end gap-3 pb-5">
            <Button
              variant={"outline"}
              className="hover:bg-blue-500 hover:text-white"
              onClick={router.back}
              type="button"
            >
              Back
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-blue-500 hover:text-white"
              type="submit"
            >
              Update Product
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
}
