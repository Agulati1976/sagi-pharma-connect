export type ProductCategory =
  | "Bone & Joint"
  | "Gastro"
  | "Pain & Inflammation"
  | "Neuro"
  | "Anti-Infective"
  | "Nutraceutical"
  | "Respiratory"
  | "Allergy";

export type ProductForm = "Tablet" | "Capsule" | "Syrup" | "Oral Solution";

export interface Product {
  name: string;
  composition: string;
  category: ProductCategory;
  form: ProductForm;
  tagline?: string;
}

export const products: Product[] = [
  {
    name: "Q-SAG-PLUS",
    composition:
      "Co-Enzyme Q10 100 mg + L-Carnitine 500 mg + Omega 3 (EPA 90 mg + DHA 60 mg) + Lycopene 5000 mcg + Astaxanthin 8 mg + Vitamin K2-7 50 mcg + Magnesium Sulphate 50 mg + Zinc Sulphate 7.5 mg",
    category: "Nutraceutical",
    form: "Tablet",
    tagline: "The Powerful Antioxidant for Total Healthcare",
  },
  {
    name: "SAGPRO-LB",
    composition:
      "Lactobacillus Acidophilus, Roamnosus, Saccharomyces Boulardii, Bifidobacterium Lactis & Longum, Clostridium Butyricum, Bacillus Clausii + Fructo Oligo Saccharide 100 mg",
    category: "Gastro",
    form: "Capsule",
    tagline: "Pre & Probiotics — Balance the Gut Flora",
  },
  {
    name: "SAGHEAL",
    composition:
      "Collagen Peptide Type 1 400 mg + Chondroitin 200 mg + Sodium Hyaluronate 30 mg + Vitamin C 33.33 mg",
    category: "Bone & Joint",
    form: "Tablet",
    tagline: "Integrated Formulation for Joint Lubrication",
  },
  {
    name: "Sagical Strong",
    composition:
      "Calcium Citrate Malate 1250 mg + Vitamin K2-7 90 mcg + Vitamin D3 1000 IU + Calcitriol 0.25 mcg + Methylcobalamin 1500 mcg + Zinc Oxide + Magnesium Oxide 50 mg",
    category: "Bone & Joint",
    form: "Tablet",
    tagline: "For Complete Bone Care & Protection",
  },
  {
    name: "Sagical-Forte",
    composition:
      "Calcium Carbonate 500 mg + Calcitriol 0.25 mcg + EPA 180 mg + DHA 120 mg + Methylcobalamin 1500 mcg + Folic Acid 4 mg + Boron 1.5 mg",
    category: "Bone & Joint",
    form: "Tablet",
  },
  {
    name: "SAGLY-PLUS",
    composition:
      "Ferrous Bisglycinate 300 mg + Zinc 1 mg + Folic Acid 5 mg + Spirulina 100 mg",
    category: "Nutraceutical",
    form: "Tablet",
    tagline: "The New Concept in Haematinics",
  },
  {
    name: "Tromisag-Forte",
    composition: "Trypsin 96 mg + Bromelain 180 mg + Rutoside Trihydrate 200 mg",
    category: "Pain & Inflammation",
    form: "Tablet",
  },
  {
    name: "ACESAG-CH",
    composition: "Aceclofenac 100 mg + Paracetamol 325 mg + Chlorzoxazone 250 mg",
    category: "Pain & Inflammation",
    form: "Tablet",
  },
  {
    name: "ACESAG-TH",
    composition: "Etoricoxib 60 mg + Thiocolchicoside 4 mg",
    category: "Pain & Inflammation",
    form: "Tablet",
  },
  {
    name: "ACESAG-SP",
    composition: "Aceclofenac 100 mg + Paracetamol 325 mg + Serratiopeptidase 15 mg",
    category: "Pain & Inflammation",
    form: "Tablet",
  },
  {
    name: "SAGPIN-100/400",
    composition: "Gabapentin 100 mg / 400 mg",
    category: "Neuro",
    form: "Tablet",
  },
  {
    name: "SAGPIN-NT 200",
    composition: "Gabapentin 200 mg + Nortriptyline",
    category: "Neuro",
    form: "Tablet",
  },
  {
    name: "SAGLY-MAX",
    composition: "Nano Curcumin 25% 500 mg + Piperine 5 mg + Lycopene 10 mg",
    category: "Nutraceutical",
    form: "Tablet",
    tagline: "The Anti-Inflammatory Protector",
  },
  {
    name: "Sagnor-PG",
    composition: "Pregabalin 75 mg + Nortriptyline 10 mg",
    category: "Neuro",
    form: "Tablet",
  },
  {
    name: "Sagi D3",
    composition: "Vitamin D3 — Sugar Free Orange Flavour",
    category: "Nutraceutical",
    form: "Oral Solution",
    tagline: "Nano Shot",
  },
  {
    name: "SAGPRO-LSR",
    composition: "Rabeprazole 20 mg + Levosulpiride 75 mg",
    category: "Gastro",
    form: "Capsule",
    tagline: "Approved Potent PPI + GI Regulator",
  },
  {
    name: "Sagpro-DSR",
    composition: "Rabeprazole 20 mg + Domperidone 30 mg",
    category: "Gastro",
    form: "Capsule",
    tagline: "The Choicest Prescription in GERD",
  },
  {
    name: "Sagvo-M",
    composition: "Levocetirizine 5 mg + Montelukast 10 mg",
    category: "Allergy",
    form: "Tablet",
  },
  {
    name: "SAGTERB",
    composition:
      "Bromhexine Hydrochloride + Terbutaline Sulphate + Guaiphenesin Syrup",
    category: "Respiratory",
    form: "Syrup",
    tagline: "Cough Syrup",
  },
  {
    name: "Sagitrep",
    composition: "Tramadol 37.5 mg + Paracetamol 325 mg",
    category: "Pain & Inflammation",
    form: "Tablet",
  },
  {
    name: "Sagitra-100",
    composition: "Itraconazole 100 mg",
    category: "Anti-Infective",
    form: "Tablet",
    tagline: "The Approved Potency, Fungicidal Specialist",
  },
];

export const categories: ProductCategory[] = [
  "Bone & Joint",
  "Gastro",
  "Pain & Inflammation",
  "Neuro",
  "Anti-Infective",
  "Nutraceutical",
  "Respiratory",
  "Allergy",
];

export const COMPANY = {
  name: "SAGI Pharmaceutical",
  tagline: "Your Health, Our Commitment",
  address:
    "Shop No. 303, Plot No. 9-10, 3rd Floor, Vardhman Capital Mall, LSC, Shakti Nagar Extn., Shakti Nagar City, Delhi-110007",
  phones: ["011-47476227", "+91 98101 90530", "+91 95558 64204"],
  email: "sagipharmaceutical@gmail.com",
};
