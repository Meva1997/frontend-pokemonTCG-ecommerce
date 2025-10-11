// Tipos para los productos
type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  stock: number;
  price: number;
  category: string;
  createdAt: string;
};

export const sampleProductsAdmin: Product[] = [
  {
    id: "1",
    name: "Charizard VMAX",
    description: "#020/073 - Champion's Path",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBH_HVTiFRcPVEnwZplTI_gpXBqw4cnyz5thHakcuQ2WKOcSeNrV1dxUw1n0x1HqTdqEniEIHE3Rvf2Sp6-2zkcRcTzhoyIVP_AVxDRRv10PLQO8AZEeqXnds8j5__XTLpRhaS8bWYss1RoI1ZIo1FIzWsuMIoLAIfOv9CsUa9yU3PItuKhfAqgonAhdTRRn-SPBZL3WgrCwHPPAJMzg2spOhN7QvqDwucgtccKMls9TWSDrPqP-ltlbrXP6STDnEKzlB675DIJ20Ub",
    stock: 12,
    price: 150.0,
    category: "Single Card",
    createdAt: "2023-10-26",
  },
  {
    id: "2",
    name: "Pikachu V-UNION Box",
    description: "Celebrations Collection",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHbm8IQU0zUBKGep174QnlPNQjVHY5PTIMiG6yIPUDqtn9_fSbIlSMRGYPVZRTNMcJxq0r483MEdYWQ25gdqzMboof99xbeYSH79MvW4y-3rQMFNRXEV4NMoFrxB8ZSfm8SHk1ef6b902jQIkpRUv4Efp0FTanR3IYECUbbDdOfN_w9KFjCz4wh1UWqd4CFBm_qclsojBwMWnTFcd18NB4aicEZzeDx5G2x-1jDN2_0Xn40bqzWMaZ8PXgiaNnfxSc6kqiUUUSLDsW",
    stock: 5,
    price: 39.99,
    category: "Box Set",
    createdAt: "2023-10-25",
  },
  {
    id: "3",
    name: "Evolving Skies Booster Box",
    description: "36 Booster Packs",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC8yejygJM5G-cSB2-3oH5fcVlNsgpp2Rn4Q64aCDgTqXM91Bw356-bluC2b09vgL_oBUNHdGGdPPnYEdR-PSoCjks9TdgdgLIdJuQvCpjM0bypk-lSi0BUViMh4DUZCy_amqJgaAwwMBFRyhYPznzUljM9eXedn7oQ9cKcCdTUCBAIBn5_ilCu7GDQ7zweMyDCfnSgI2eJSMkjTIzYYwAbbYn_Z8ttePCwwKNMgcef1d1e-msSKM_RVp6zNADMsRWo58acftlGv_K",
    stock: 0,
    price: 450.0,
    category: "Booster Box",
    createdAt: "2023-10-22",
  },
  {
    id: "4",
    name: "Ultra Pro Sleeves",
    description: "100-pack, Clear",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBklHP_-x0XDZODNK2QBwAf1cqND-C3KxoqUiz3fL3Vk98XTXjw29UMp_nCS63T5zGBTEaq3HqVw8VCO2mulTn8T6n0z3aaso9GDH-zod1uCv_0Phy0blC_iqBmfSu7r6Bn7BXTjWRBb0vhiWg7MvWx13Yzm4TNZjgxqPa4kTBOBIe7o0Ud7K1tv_M2hzBp4wPd-gc3ieZoZnr3KJlq5ftzyC_kEkvjCjTFdUCv_hbPdI7Qp0y8KrC7W1A2CM2yjJZJiEUWD_IHC4Fn",
    stock: 50,
    price: 7.99,
    category: "Accessories",
    createdAt: "2023-10-20",
  },
];

type Product2 = {
  id: string;
  name: string;
  description: string;
  image: string;
  stock: number;
  price: number;
  category: string;
};

// Datos de ejemplo
export const sampleProducts: Product2[] = [
  {
    id: "1",
    name: "Charizard - Base Set",
    description:
      "Una de las cartas más icónicas y buscadas del TCG de Pokémon.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiMhkQlP24m7cpFvY5ciUupYkdQ_dcPOWNm3qH4yGl4H5abSL73SoWKLi-DuA3N9_RMuYXAu3AVO8KcY0hy2LZnb5HMFUIRNK_Bgfotjz2EPYU9kwpMlrLmjUWLfP-pjlI1br-gCLvbAvzFWim0Ag87iQSJ469Az4kbwgmDAoVFzU5hFr3ZfmuGevpd6xTOdGfAJTUtABt4ejQuMA9s82BlruJ8w3VrAu443HwRVYnGfcRByaF1w5mWrmWeyhVs5MepqN5wqnqhndF",
    stock: 5,
    price: 199.99,
    category: "Carta Individual",
  },
  {
    id: "2",
    name: "Blastoise - Base Set",
    description:
      "La poderosa evolución final de Squirtle, un clásico de la primera generación.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdqvoP4103s_og6Nam9_XXjyjm3m4yreKw_ul07flbXu-svFqIdG2IqBrkGRU91jdNrJm8erTdAZvjLNWcQhSjj2a48o6X7rcHar36IJFeP58kEAg3n-KLrrcI3uSlNIjy4OxlAFukodDVv8aG5w0dX9_QUl_aMLHRbjROhg7QBJpfVngD0fKKfuzXbJgemT5cUvKJkbawdQzEHbWUPUfZTs5xzRanEA6Eo_xsnKuFirCzHrySAhunonzrx5Nqv7Ot7GENuzEDP17w",
    stock: 8,
    price: 149.99,
    category: "Carta Individual",
  },
  {
    id: "3",
    name: "Venusaur - Base Set",
    description:
      "La forma final de Bulbasaur, una carta esencial para coleccionistas.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbEe3Bf2zVdRqJqBvsmSl0lmKmTjrmcriT2NbxTZWObjUKeAkU_F--UE-TZP67G1WL1xWjS4k54tlIa9RvwOAUypfapCTLXAxddPKqXNHoVeB0qw3tIdAHr4btIQLen38ZxkcV7XJomeZOsmEZtymXmNK2t0PqY7xKkrppYiCKRfsQvl3RdccjaiCAvmXn3LFhXSPqHTrQg02MsxYo2sSZE0IIH518ufNCnz4Wkz4Wm9M5tIQ0qW7u-dFi3d-Aub04uhWf2DRw2Jn1",
    stock: 12,
    price: 129.99,
    category: "Carta Individual",
  },
  {
    id: "4",
    name: "Pikachu - Base Set",
    description:
      "La mascota icónica de Pokémon, una adición adorable y valiosa.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkU27bDeMrv8IGDt_jDqPkBNOJ1xvGpC4pH4fUS49PzeIXy0TP0g8wESKk492KPNaaQ0BhUzeXjr1D7V0223A7DwtW89UfWlQRUHUEXntslKgxwiKAh2PTQF2lzmJ9-LBmX-aeUk3bEyAazDOXnTpaU1qd6zV3RIh9CP8M_q2VuZvCvwR0VEYq11c3aXkVRsiukKF9UJgvtCNNn8xTgiiiR2NAEG-2zE82DA-A32SQwtMSKhBnrczK4-Ji-Io3mc7ECrY55S3kEcFu",
    stock: 3,
    price: 79.99,
    category: "Carta Individual",
  },
  {
    id: "5",
    name: "Espada y Escudo - Origen Perdido",
    description:
      "Caja de sobres de la expansión Origen Perdido. Contiene 36 sobres.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuAvOx9_9tefsLg2Hq9hsRqx1Kv2WJohae9LFbNurWb7r30_ExxtKCgqUR-0MoZLgeIsOVMA6z4H7hlyuOhUwKjRnwqz7EDjLD8gyN9IPHQ6bIY7PVFCyx4DkA9NWnSHkic5fAoigHNY7OxKCMkBxo_wULY5QiEKMWCL-DzuPe2Akq4L46E38qVnGE1edYOJOPaiPRcDY1okvxM36y3mwIFQdYsJlqUq05TVlMY9ru1Zk_gwyMiVdYjQfH0-pyfV-lwLNrtN-lGGcx",
    stock: 20,
    price: 140.0,
    category: "Booster Box",
  },
  {
    id: "6",
    name: "Obsidian Flames ETB",
    description:
      "Caja de Entrenador Élite de Llamas de Obsidiana. Ideal para empezar.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuAvOx9_9tefsLg2Hq9hsRqx1Kv2WJohae9LFbNurWb7r30_ExxtKCgqUR-0MoZLgeIsOVMA6z4H7hlyuOhUwKjRnwqz7EDjLD8gyN9IPHQ6bIY7PVFCyx4DkA9NWnSHkic5fAoigHNY7OxKCMkBxo_wULY5QiEKMWCL-DzuPe2Akq4L46E38qVnGE1edYOJOPaiPRcDY1okvxM36y3mwIFQdYsJlqUq05TVlMY9ru1Zk_gwyMiVdYjQfH0-pyfV-lwLNrtN-lGGcx",
    stock: 0,
    price: 49.99,
    category: "Elite Trainer Box",
  },
  {
    id: "7",
    name: "Fundas protectoras Ultra Pro",
    description: "Paquete de 100 fundas para proteger tus cartas más valiosas.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuAvOx9_9tefsLg2Hq9hsRqx1Kv2WJohae9LFbNurWb7r30_ExxtKCgqUR-0MoZLgeIsOVMA6z4H7hlyuOhUwKjRnwqz7EDjLD8gyN9IPHQ6bIY7PVFCyx4DkA9NWnSHkic5fAoigHNY7OxKCMkBxo_wULY5QiEKMWCL-DzuPe2Akq4L46E38qVnGE1edYOJOPaiPRcDY1okvxM36y3mwIFQdYsJlqUq05TVlMY9ru1Zk_gwyMiVdYjQfH0-pyfV-lwLNrtN-lGGcx",
    stock: 50,
    price: 9.99,
    category: "Accesorio",
  },
  {
    id: "8",
    name: "Caja Celebrations Pikachu V-UNION",
    description: "Una colección especial para celebrar los 25 años de Pokémon.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuAvOx9_9tefsLg2Hq9hsRqx1Kv2WJohae9LFbNurWb7r30_ExxtKCgqUR-0MoZLgeIsOVMA6z4H7hlyuOhUwKjRnwqz7EDjLD8gyN9IPHQ6bIY7PVFCyx4DkA9NWnSHkic5fAoigHNY7OxKCMkBxo_wULY5QiEKMWCL-DzuPe2Akq4L46E38qVnGE1edYOJOPaiPRcDY1okvxM36y3mwIFQdYsJlqUq05TVlMY9ru1Zk_gwyMiVdYjQfH0-pyfV-lwLNrtN-lGGcx",
    stock: 7,
    price: 39.99,
    category: "Colección Especial",
  },
];

//! Mock data for products
// [
//   {
//   "name": "Charizard VMAX",
//   "description": "#020/073 - Champion's Path",
//   "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBH_HVTiFRcPVEnwZplTI_gpXBqw4cnyz5thHakcuQ2WKOcSeNrV1dxUw1n0x1HqTdqEniEIHE3Rvf2Sp6-2zkcRcTzhoyIVP_AVxDRRv10PLQO8AZEeqXnds8j5__XTLpRhaS8bWYss1RoI1ZIo1FIzWsuMIoLAIfOv9CsUa9yU3PItuKhfAqgonAhdTRRn-SPBZL3WgrCwHPPAJMzg2spOhN7QvqDwucgtccKMls9TWSDrPqP-ltlbrXP6STDnEKzlB675DIJ20Ub",
//   "stock": 12,
//   "price": 150.00,
//   "categoryId": 2
//   },
//   {
//     "name": "Pikachu V-UNION Box",
//     "description": "Celebrations Collection",
//     "image":
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAHbm8IQU0zUBKGep174QnlPNQjVHY5PTIMiG6yIPUDqtn9_fSbIlSMRGYPVZRTNMcJxq0r483MEdYWQ25gdqzMboof99xbeYSH79MvW4y-3rQMFNRXEV4NMoFrxB8ZSfm8SHk1ef6b902jQIkpRUv4Efp0FTanR3IYECUbbDdOfN_w9KFjCz4wh1UWqd4CFBm_qclsojBwMWnTFcd18NB4aicEZzeDx5G2x-1jDN2_0Xn40bqzWMaZ8PXgiaNnfxSc6kqiUUUSLDsW",
//     "stock": 5,
//     "price": 39.99,
//     "categoryId": 1
//   },
//   {
//   "name": "Evolving Skies Booster Box",
//   "description": "36 Booster Packs",
//   "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAC8yejygJM5G-cSB2-3oH5fcVlNsgpp2Rn4Q64aCDgTqXM91Bw356-bluC2b09vgL_oBUNHdGGdPPnYEdR-PSoCjks9TdgdgLIdJuQvCpjM0bypk-lSi0BUViMh4DUZCy_amqJgaAwwMBFRyhYPznzUljM9eXedn7oQ9cKcCdTUCBAIBn5_ilCu7GDQ7zweMyDCfnSgI2eJSMkjTIzYYwAbbYn_Z8ttePCwwKNMgcef1d1e-msSKM_RVp6zNADMsRWo58acftlGv_K",
//   "stock": 0,
//   "price": 450.00,
//   "categoryId": 1
//   },
//   {
//   "name": "Ultra Pro Sleeves",
//   "description": "100-pack, Clear",
//   "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBklHP_-x0XDZODNK2QBwAf1cqND-C3KxoqUiz3fL3Vk98XTXjw29UMp_nCS63T5zGBTEaq3HqVw8VCO2mulTn8T6n0z3aaso9GDH-zod1uCv_0Phy0blC_iqBmfSu7r6Bn7BXTjWRBb0vhiWg7MvWx13Yzm4TNZjgxqPa4kTBOBIe7o0Ud7K1tv_M2hzBp4wPd-gc3ieZoZnr3KJlq5ftzyC_kEkvjCjTFdUCv_hbPdI7Qp0y8KrC7W1A2CM2yjJZJiEUWD_IHC4Fn",
//   "stock": 50,
//   "price": 7.99,
//   "categoryId": 3
//   }
// ]
