import { useState } from "react";

type ShippingOption = {
  id: string;
  name: string;
  eta: string;
  price: string;
  logo: string;
};

interface ShippingDropdownProps {
  onShippingSelect: (selectedOption: ShippingOption) => void;
}

const ShippingDropdown: React.FC<ShippingDropdownProps> = ({
  onShippingSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(
    null,
  );

  const shippingOptions: ShippingOption[] = [
    {
      id: "jnt",
      name: "J&T Express",
      eta: "2 - 3 Hari",
      price: "15000",
      logo: "/assets/image/jnt-logo.png",
    },
    {
      id: "sicepat",
      name: "SiCepat",
      eta: "2 - 3 Hari",
      price: "12000",
      logo: "/assets/image/sicepat-logo.png",
    },
    {
      id: "jne",
      name: "JNE",
      eta: "2 - 3 Hari",
      price: "10000",
      logo: "/assets/image/jne-logo.png",
    },
    {
      id: "ninja",
      name: "Ninja Standard",
      eta: "2 - 3 Hari",
      price: "20000",
      logo: "/assets/image/Ninja-logo.png",
    },
    {
      id: "tiki",
      name: "TIKI",
      eta: "2 - 3 Hari",
      price: "10000",
      logo: "/assets/image/tiki-logo.png",
    },
  ];

  const handleSelect = (option: ShippingOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onShippingSelect(option);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-md border bg-white px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedOption
          ? `${selectedOption.name} - Rp${parseInt(selectedOption.price).toLocaleString()}`
          : "Select Expedition"}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          <ul className="divide-y divide-gray-200">
            {shippingOptions.map((option) => (
              <li
                key={option.id}
                className="flex cursor-pointer items-center p-4 hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                <img
                  src={option.logo}
                  alt={`${option.name} logo`}
                  className="mr-4 h-10 w-10"
                />
                <div>
                  <h3 className="text-sm font-medium">{option.name}</h3>
                  <p className="text-xs text-gray-500">Eta. {option.eta}</p>
                  <p className="text-sm font-semibold text-green-500">
                    Rp{parseInt(option.price).toLocaleString()}
                  </p>
                </div>
                <div className="ml-auto">
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedOption?.id === option.id}
                    readOnly
                    className="h-4 w-4 text-blue-500"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShippingDropdown;
