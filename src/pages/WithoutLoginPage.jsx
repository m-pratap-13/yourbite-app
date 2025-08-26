import React from "react";
import NewUserGuide from "../componenets/Main/NewUserGuide";

function WithoutLoginPage() {
  const userCategories = [
    {
      image:
        "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg",
      name: "SELLER",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo totam dolore labore ut rerum impedit, suscipit facilis doloribus, explicabo eligendi a reiciendis corrupti autem soluta. Est nobis quibusdam veritatis fuga!",
      buttonText: "Create Seller Account",
      slug: "/seller-registration",
    },
    {
      image:
        "https://images.pexels.com/photos/8734425/pexels-photo-8734425.jpeg",
      name: "CUSTOMER",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo totam dolore labore ut rerum impedit, suscipit facilis doloribus, explicabo eligendi a reiciendis corrupti autem soluta. Est nobis quibusdam veritatis fuga!",
      buttonText: "Create Customer Account",
      slug: "/customer-registration",
    },
    {
      image:
        "https://images.pexels.com/photos/33305849/pexels-photo-33305849.jpeg",
      name: "DERIVERY BOY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo totam dolore labore ut rerum impedit, suscipit facilis doloribus, explicabo eligendi a reiciendis corrupti autem soluta. Est nobis quibusdam veritatis fuga!",
      buttonText: "Create Derivery Boy Account",
      slug: "/derivery-boy-registration",
    },
  ];
  return (
    <div className="flex flex-wrap justify-evenly items-center p-7 m-2 gap-2">
      {userCategories.map((category) => (
        <NewUserGuide
          key={category.name}
          name={category.name}
          image={category.image}
          description={category.description}
          buttonText={category.buttonText}
          slug={category.slug}
        />
      ))}
    </div>
  );
}

export default WithoutLoginPage;
