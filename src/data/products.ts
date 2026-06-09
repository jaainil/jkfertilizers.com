export interface HowToApplyStep {
  step: string;
  title: string;
  detail: string;
}

export interface ProductBenefit {
  title: string;
  detail: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  title: string;
  imageUrl: string;
  summary: string;
  fit: string[];
  category: string;
  tagline: string;
  description: string;
  howToApply: HowToApplyStep[];
  benefits: ProductBenefit[];
  specs: ProductSpec[];
}

export const products: Product[] = [
  {
    slug: "organic-manure",
    title: "Organic Manure",
    imageUrl: "/images/products/organic-manure.png",
    summary:
      "Certified, government-approved organic fertilizer under FCO. Natural, eco-friendly fertilizer crafted from nutrient-rich organic materials to enhance soil health and boost crop growth sustainably.",
    fit: ["FCO Approved", "Soil Health", "Sustainable Farming"],
    category: "Organic Fertilizers",
    tagline: "Natural eco-friendly fertilizer for sustainable farming.",
    description:
      "Organic Manure is a certified, government-approved fertilizer under the Fertilizer Control Order (FCO), ensuring quality and reliability. This natural, eco-friendly fertilizer is crafted from nutrient-rich organic materials to enhance soil health and boost crop growth sustainably.\n\nIt improves soil structure, enhances water retention, and provides essential nutrients for farming without harmful chemicals. Organic Manure supports long-term soil fertility, healthier crops, and environmentally sustainable practices. Ideal for direct application or blending with other enhancers, it's a versatile solution that improves soil vitality and promotes productivity while aligning with sustainable agriculture goals.",
    howToApply: [
      {
        step: "01",
        title: "Soil Incorporation",
        detail: "Mix the organic manure directly into the soil before sowing for uniform nutrient distribution and improved soil structure.",
      },
      {
        step: "02",
        title: "Top Dressing",
        detail: "For established crops, apply as a top dressing around the base of plants and water gently to activate nutrient release.",
      },
      {
        step: "03",
        title: "Blending",
        detail: "Can be blended with other organic or mineral amendments to create customized nutrient profiles for specific crop needs.",
      },
    ],
    benefits: [
      { title: "Improves Soil Structure", detail: "Enhances soil aeration, water retention, and root penetration for healthier plant growth." },
      { title: "Rich in Organic Nutrients", detail: "Provides essential macro and micronutrients naturally, without harmful chemical residues." },
      { title: "FCO Approved", detail: "Certified and government-approved under Fertilizer Control Order, ensuring quality and reliability." },
      { title: "Sustainable Farming", detail: "Supports long-term soil fertility and environmentally responsible agricultural practices." },
    ],
    specs: [
      { label: "Type", value: "Organic Fertilizer" },
      { label: "Form", value: "Granules / Powder" },
      { label: "Certification", value: "FCO Approved" },
      { label: "Application", value: "Soil incorporation, top dressing, blending" },
      { label: "Category", value: "Organic Fertilizers" },
    ],
  },
  {
    slug: "pdm",
    title: "PDM",
    imageUrl: "/images/products/pdm.png",
    summary:
      "PDM (Potash Derived from Molasses) is a certified FCO-approved, eco-friendly organic source of potash that enhances plant health, disease resistance, and crop yields.",
    fit: ["FCO Approved", "Potash Source", "Disease Resistance"],
    category: "Organic Fertilizers",
    tagline: "Organic potash for healthier, resilient crops.",
    description:
      "PDM (Potash Derived from Molasses) is a certified, government-approved fertilizer under the Fertilizer Control Order (FCO), ensuring adherence to stringent quality and safety standards. Produced through a sustainable process, PDM is an eco-friendly, organic source of potash.\n\nThis premium fertilizer provides essential potassium to enhance plant health, improve disease resistance, and boost crop yields. PDM supports optimal root development, strengthens cell walls, and enhances water retention in plants, resulting in healthier, more resilient crops. Its slow-release nature ensures long-term soil fertility and consistent crop nutrition, making it ideal for both conventional and organic farming systems.",
    howToApply: [
      {
        step: "01",
        title: "Basal Application",
        detail: "Apply PDM granules at the time of sowing or planting for a strong start with adequate potash availability.",
      },
      {
        step: "02",
        title: "Top Dressing",
        detail: "For crops with high potassium demand, apply as a top dressing during the growing season for continuous nutrition.",
      },
      {
        step: "03",
        title: "Soil Mixing",
        detail: "Mix thoroughly with soil for even distribution and optimal root zone placement of potash nutrients.",
      },
    ],
    benefits: [
      { title: "Rich Organic Potash", detail: "Provides essential potassium from natural, sustainable sources for balanced crop nutrition." },
      { title: "FCO Approved", detail: "Government-certified under Fertilizer Control Order, ensuring quality and safety standards." },
      { title: "Enhances Disease Resistance", detail: "Strengthens plant cell walls and improves natural defense mechanisms against diseases." },
      { title: "Slow-Release Nutrition", detail: "Ensures long-term soil fertility and consistent nutrient supply throughout the growing season." },
    ],
    specs: [
      { label: "Type", value: "Organic Potash Fertilizer" },
      { label: "Form", value: "Granules" },
      { label: "Source", value: "Molasses (sustainable process)" },
      { label: "Certification", value: "FCO Approved" },
      { label: "Application", value: "Basal, top dressing, soil mixing" },
    ],
  },
  {
    slug: "prom",
    title: "PROM",
    imageUrl: "/images/products/prom.png",
    summary:
      "PROM (Phosphate Rich Organic Manure) is a certified FCO-approved, eco-friendly phosphorus-rich organic fertilizer designed to enhance soil fertility and boost root development.",
    fit: ["FCO Approved", "Phosphorus Source", "Root Development"],
    category: "Organic Fertilizers",
    tagline: "Phosphorus-rich organic manure for thriving roots.",
    description:
      "PROM (Phosphate Rich Organic Manure) is a certified, government-approved fertilizer under the Fertilizer Control Order (FCO), ensuring reliability and quality. This eco-friendly, phosphorus-rich organic fertilizer is designed to naturally enhance soil fertility and boost root development.\n\nCrafted from high-quality organic materials, PROM improves nutrient availability, enriches soil structure, and enhances water retention. It supports balanced crop nutrition and sustainable farming practices without harmful chemicals. Suitable for direct application or blending with other soil enhancers, PROM is the ideal choice for farmers aiming for healthy crops and long-term soil health.",
    howToApply: [
      {
        step: "01",
        title: "Soil Application",
        detail: "Apply PROM directly to the soil before sowing, ensuring even distribution for optimal phosphorus availability.",
      },
      {
        step: "02",
        title: "Blending",
        detail: "Can be blended with other organic fertilizers or soil amendments to create a customized nutrient mix.",
      },
      {
        step: "03",
        title: "Fertigation",
        detail: "Suitable for use in fertigation systems where applicable, providing consistent phosphorus supply to crops.",
      },
    ],
    benefits: [
      { title: "Rich in Organic Phosphorus", detail: "Provides essential phosphorus for strong root development and improved crop yields." },
      { title: "FCO Approved", detail: "Government-certified under Fertilizer Control Order, ensuring quality and reliability." },
      { title: "Improves Soil Fertility", detail: "Enriches soil with organic matter, enhances water retention, and promotes healthy microbial activity." },
      { title: "Eco-Friendly", detail: "100% organic, free from harmful chemicals, supporting sustainable agricultural practices." },
    ],
    specs: [
      { label: "Type", value: "Phosphate Rich Organic Manure" },
      { label: "Form", value: "Granules" },
      { label: "Key Nutrient", value: "Phosphorus (organic)" },
      { label: "Certification", value: "FCO Approved" },
      { label: "Application", value: "Soil application, blending, fertigation" },
    ],
  },
  {
    slug: "mycorrhiza-granules-biofertilizers",
    title: "Mycorrhiza Granules & Biofertilizers",
    imageUrl: "/images/products/mycorrhiza-granules.png",
    summary:
      "Advanced Mycorrhiza solutions for stronger roots, healthier crops, and sustainable farming. Increases nutrient uptake by up to 30% and reduces water stress.",
    fit: ["Root Health", "Biofertilizer", "Sustainable"],
    category: "Biofertilizers",
    tagline: "Root deeper, grow greener.",
    description:
      "J K Fertilizers brings you advanced Mycorrhiza solutions for stronger roots, healthier crops, and sustainable farming.\n\nMycorrhiza is a beneficial fungi that live symbiotically with plant roots. They extend the root system, enabling crops to absorb more water and essential nutrients from the soil. With Mycorrhiza, plants grow stronger, healthier, and more resilient – naturally.\n\nWe specialize in in-vitro Mycorrhiza because it ensures premium quality for high-value crops and advanced applications. Our Mycorrhiza coated granules are bentonite-free, lighter, eco-friendly, and biodegradable with faster spore release and superior soil integration.",
    howToApply: [
      {
        step: "01",
        title: "Broadcast Application",
        detail: "Broadcast Mycorrhiza coated granules in fields before sowing for uniform distribution and root colonization.",
      },
      {
        step: "02",
        title: "Soil Mix for Nurseries",
        detail: "Mix with soil for nurseries and transplant crops to ensure early root colonization and stronger seedlings.",
      },
      {
        step: "03",
        title: "With Fertilizers",
        detail: "Apply with basal or top-dressing fertilizers for enhanced nutrient uptake and improved fertilizer efficiency.",
      },
    ],
    benefits: [
      { title: "Stronger Root Systems", detail: "Extended root penetration deeper into soil for robust plant growth and development." },
      { title: "Higher Yields", detail: "Proven increase in crop productivity through enhanced nutrient availability and plant vigor." },
      { title: "Enhanced Absorption", detail: "Superior water and nutrient uptake efficiency, reducing irrigation needs by up to 30%." },
      { title: "Eco-Friendly", detail: "Bentonite-free, biodegradable granules with faster spore release and soil integration." },
    ],
    specs: [
      { label: "Type", value: "Biofertilizer / Mycorrhiza" },
      { label: "Form", value: "Granules (Coated)" },
      { label: "Production Method", value: "In-Vitro (contamination-free)" },
      { label: "Capacity", value: "4500 kg/annum (Technical Grade)" },
      { label: "Application", value: "Broadcast, nursery mix, with fertilizers" },
    ],
  },
  {
    slug: "customized-base-granules",
    title: "Customized Base Granules",
    imageUrl: "/images/products/customized-base-granules.png",
    summary:
      "Tailored base granules manufactured to your exact specifications. Custom nutrient profiles using mineral and organic bases for diverse agricultural needs.",
    fit: ["Custom Formulation", "B2B Supply", "Multi-crop"],
    category: "Base Granules",
    tagline: "Built to your exact specifications.",
    description:
      "Customized Base Granules are manufactured to meet specific client requirements, with tailored nutrient profiles using materials like Gypsum, Dolomite, organic compost, and mineral blends. These granules serve as the perfect foundation for your unique fertilizer formulations.\n\nAt J K Fertilizers, we work closely with our B2B partners to develop base granules that match exact specifications for nutrient content, particle size, hardness, and density — ensuring consistent performance in the field.",
    howToApply: [
      {
        step: "01",
        title: "Direct Application",
        detail: "Use as a standalone soil amendment for targeted nutrient delivery based on soil analysis.",
      },
      {
        step: "02",
        title: "Coating Substrate",
        detail: "Ideal as a base substrate for coating with liquid or powder active ingredients for enhanced performance.",
      },
      {
        step: "03",
        title: "Blending Component",
        detail: "Mix with other granular products to create homogeneous fertilizer blends for specific crop requirements.",
      },
    ],
    benefits: [
      { title: "Fully Customizable", detail: "Tailored nutrient composition, particle size, and physical properties to meet your exact needs." },
      { title: "Consistent Quality", detail: "Manufactured under strict quality controls ensuring batch-to-batch consistency." },
      { title: "Versatile Application", detail: "Suitable for direct use, as a coating base, or as a blending component." },
      { title: "Premium Raw Materials", detail: "Made from high-quality mineral and organic inputs for superior performance." },
    ],
    specs: [
      { label: "Type", value: "Customized Fertilizer Base" },
      { label: "Form", value: "Granules" },
      { label: "Customization", value: "Nutrient profile, size, density, hardness" },
      { label: "Base Materials", value: "Gypsum, Dolomite, organic compost, minerals" },
      { label: "Application", value: "Direct, coating substrate, blending" },
    ],
  },
  {
    slug: "customized-coated-granules",
    title: "Customized Coated Granules",
    imageUrl: "/images/products/customized-coated-granules.png",
    summary:
      "Precision-coated granules with active ingredients applied to base granules. Uniform coating for controlled release and enhanced field performance.",
    fit: ["Controlled Release", "Precision Coating", "Enhanced Performance"],
    category: "Coated Granules",
    tagline: "Precision coating for enhanced performance.",
    description:
      "Customized Coated Granules are manufactured by applying active ingredients, liquids, or powders onto base granules using advanced coating technology. This ensures uniform coating, controlled release, and reliable field performance.\n\nJ K Fertilizers' coating process allows for the addition of bio-stimulants, micronutrients, bio-pesticides, and other active ingredients to create value-added products that deliver targeted benefits to crops.",
    howToApply: [
      {
        step: "01",
        title: "Direct Field Application",
        detail: "Apply coated granules directly to the soil for controlled release of active ingredients throughout the growing season.",
      },
      {
        step: "02",
        title: "In-Furrow Placement",
        detail: "Place granules in the seed furrow at planting for targeted nutrient delivery to the root zone.",
      },
      {
        step: "03",
        title: "Side Dressing",
        detail: "Apply alongside growing crops as a side dressing for supplemental nutrition during critical growth stages.",
      },
    ],
    benefits: [
      { title: "Uniform Coating", detail: "Advanced coating technology ensures even distribution of active ingredients on every granule." },
      { title: "Controlled Release", detail: "Optimized release profile for sustained nutrient availability and reduced environmental loss." },
      { title: "Value Addition", detail: "Combine multiple active ingredients in a single granule for comprehensive crop nutrition." },
      { title: "Enhanced Efficiency", detail: "Targeted delivery of nutrients and actives improves uptake and reduces waste." },
    ],
    specs: [
      { label: "Type", value: "Custom Coated Granules" },
      { label: "Form", value: "Coated Granules" },
      { label: "Coating Options", value: "Bio-stimulants, micronutrients, bio-pesticides" },
      { label: "Base Materials", value: "Mineral or organic base granules" },
      { label: "Application", value: "Direct, in-furrow, side dressing" },
    ],
  },
  {
    slug: "coated-base-granules-bio-npk",
    title: "Coated Base Granules (BIO NPK)",
    imageUrl: "/images/products/coated-base-granules-bio-npk.png",
    summary:
      "Bio NPK coated granules that combine essential macro-nutrients with organic and biological actives for balanced crop nutrition and improved soil health.",
    fit: ["NPK Nutrition", "Bio Actives", "Balanced Growth"],
    category: "Coated Granules",
    tagline: "Balanced NPK nutrition with biological benefits.",
    description:
      "Coated Base Granules (BIO NPK) combine essential nitrogen, phosphorus, and potassium with organic and biological active ingredients. These granules provide balanced macro-nutrient delivery while also supporting soil biological activity.\n\nThe BIO NPK coating enhances nutrient use efficiency, reduces environmental losses, and ensures that crops receive a steady supply of essential nutrients throughout their growth cycle.",
    howToApply: [
      {
        step: "01",
        title: "Basal Application",
        detail: "Apply at the time of sowing or transplanting for a strong nutritional foundation.",
      },
      {
        step: "02",
        title: "Top Dressing",
        detail: "Use as a top dressing during peak growth stages when nutrient demand is highest.",
      },
      {
        step: "03",
        title: "Fertigation Ready",
        detail: "Compatible with fertigation systems for precise nutrient management in irrigated crops.",
      },
    ],
    benefits: [
      { title: "Complete NPK Nutrition", detail: "Provides balanced macro-nutrients with enhanced biological activity for optimal crop growth." },
      { title: "Improved Efficiency", detail: "Coating technology reduces nutrient losses through leaching and volatilization." },
      { title: "Soil Health", detail: "Organic and biological components support beneficial soil microbial activity." },
      { title: "Sustainable", detail: "Eco-friendly formulation that supports long-term soil fertility and crop productivity." },
    ],
    specs: [
      { label: "Type", value: "Bio NPK Coated Granules" },
      { label: "Form", value: "Coated Granules" },
      { label: "Nutrients", value: "Nitrogen, Phosphorus, Potassium + Bio Actives" },
      { label: "Application", value: "Basal, top dressing, fertigation" },
      { label: "Category", value: "Coated Granules" },
    ],
  },
  {
    slug: "coated-base-granules-mycorrhiza",
    title: "Coated Base Granules (Mycorrhiza)",
    imageUrl: "/images/products/coated-base-granules-mycorrhiza.png",
    summary:
      "Mycorrhiza-coated base granules that combine the benefits of beneficial fungi with a nutrient-rich carrier for enhanced root development and soil health.",
    fit: ["Mycorrhiza", "Root Health", "Sustainable"],
    category: "Coated Granules",
    tagline: "Mycorrhiza-powered granules for deeper roots.",
    description:
      "Coated Base Granules (Mycorrhiza) combine the power of beneficial mycorrhizal fungi with a nutrient-rich base granule carrier. These granules provide an easy-to-use, farmer-friendly solution for enhancing root development and nutrient uptake.\n\nThe mycorrhiza coating ensures that beneficial fungi are delivered directly to the root zone, where they form symbiotic relationships with crops — extending root systems and improving access to water and nutrients.",
    howToApply: [
      {
        step: "01",
        title: "Field Broadcast",
        detail: "Broadcast granules evenly across the field before sowing for uniform mycorrhiza colonization.",
      },
      {
        step: "02",
        title: "Nursery Application",
        detail: "Mix with nursery soil or potting medium for early root colonization in seedlings.",
      },
      {
        step: "03",
        title: "Transplanting",
        detail: "Apply in the planting hole during transplanting for direct root zone inoculation.",
      },
    ],
    benefits: [
      { title: "Enhanced Root Development", detail: "Mycorrhiza fungi extend root systems for improved nutrient and water access." },
      { title: "Improved Nutrient Uptake", detail: "Up to 30% increase in phosphorus and micronutrient absorption efficiency." },
      { title: "Stress Tolerance", detail: "Enhanced resistance to drought, salinity, and environmental stress factors." },
      { title: "Sustainable Solution", detail: "Reduces dependence on chemical fertilizers while maintaining crop productivity." },
    ],
    specs: [
      { label: "Type", value: "Mycorrhiza Coated Granules" },
      { label: "Form", value: "Coated Granules" },
      { label: "Active", value: "Mycorrhizal fungi (in-vitro)" },
      { label: "Carrier", value: "Mineral / organic base granules" },
      { label: "Application", value: "Broadcast, nursery, transplant" },
    ],
  },
  {
    slug: "pancharatna-base-granules",
    title: "Pancharatna Base Granules",
    imageUrl: "/images/products/pancharatna-base-granules.png",
    summary:
      "Premium multi-nutrient base granules enriched with five essential components for comprehensive soil health and crop nutrition.",
    fit: ["Multi-nutrient", "Premium", "All Crops"],
    category: "Base Granules",
    tagline: "Five essential nutrients in one powerful granule.",
    description:
      "Pancharatna Base Granules are J K Fertilizers' premium multi-nutrient formulation, enriched with five essential components for comprehensive soil health and crop nutrition. These granules provide a balanced blend of organic matter, minerals, and beneficial inputs.\n\nThe unique 'Pancharatna' (five gems) formulation ensures that crops receive a complete spectrum of nutrients for optimal growth, yield, and quality.",
    howToApply: [
      {
        step: "01",
        title: "Pre-Sowing Application",
        detail: "Apply during land preparation for thorough incorporation into the soil.",
      },
      {
        step: "02",
        title: "Basal Dressing",
        detail: "Apply at the time of sowing or planting for immediate nutrient availability.",
      },
      {
        step: "03",
        title: "Top Dressing",
        detail: "For long-duration crops, apply as a top dressing during critical growth stages.",
      },
    ],
    benefits: [
      { title: "Five Essential Components", detail: "Unique blend of organic matter, minerals, and beneficial inputs for complete nutrition." },
      { title: "Comprehensive Nutrition", detail: "Provides macro and micronutrients in a balanced formulation for all crop types." },
      { title: "Soil Health Improvement", detail: "Enhances soil structure, microbial activity, and long-term fertility." },
      { title: "Premium Quality", detail: "Manufactured with high-quality raw materials for consistent performance." },
    ],
    specs: [
      { label: "Type", value: "Multi-nutrient Base Granules" },
      { label: "Form", value: "Granules" },
      { label: "Components", value: "5 essential nutrients + organic matter" },
      { label: "Application", value: "Pre-sowing, basal, top dressing" },
      { label: "Category", value: "Base Granules" },
    ],
  },
  {
    slug: "organic-carbon-base-granules",
    title: "Organic Carbon Base Granules",
    imageUrl: "/images/products/organic-carbon-base-granules.png",
    summary:
      "Carbon-rich base granules that replenish soil organic matter, feed beneficial microbes, and improve soil structure and water holding capacity.",
    fit: ["Soil Carbon", "Microbial Health", "Soil Structure"],
    category: "Base Granules",
    tagline: "Rebuild soil carbon for healthier farms.",
    description:
      "Organic Carbon Base Granules are rich in organic carbon, designed to replenish soil organic matter levels. These granules feed beneficial soil microbes, improve soil structure, and enhance water holding capacity.\n\nSoil organic carbon is the foundation of soil health. Our Organic Carbon Base Granules provide a concentrated source of stable organic carbon that supports long-term soil fertility and productivity.",
    howToApply: [
      {
        step: "01",
        title: "Soil Incorporation",
        detail: "Mix into the soil during land preparation for deep carbon enrichment of the root zone.",
      },
      {
        step: "02",
        title: "Surface Application",
        detail: "Apply on the soil surface and incorporate lightly for topsoil carbon enhancement.",
      },
      {
        step: "03",
        title: "Blending",
        detail: "Blend with other fertilizers to create carbon-enriched nutrient formulations.",
      },
    ],
    benefits: [
      { title: "High Organic Carbon", detail: "Concentrated source of stable organic carbon for soil enrichment." },
      { title: "Microbial Support", detail: "Feeds beneficial soil microorganisms, enhancing biological activity and nutrient cycling." },
      { title: "Improved Soil Structure", detail: "Enhances soil aggregation, porosity, and water holding capacity." },
      { title: "Long-Term Fertility", detail: "Builds soil organic matter for sustained productivity over multiple seasons." },
    ],
    specs: [
      { label: "Type", value: "Organic Carbon Fertilizer" },
      { label: "Form", value: "Granules" },
      { label: "Key Component", value: "Organic Carbon" },
      { label: "Application", value: "Soil incorporation, surface, blending" },
      { label: "Category", value: "Base Granules" },
    ],
  },
  {
    slug: "humic-based-granules",
    title: "Humic Based Granules",
    imageUrl: "/images/products/humic-based-granules.png",
    summary:
      "Humic acid enriched granules that improve nutrient uptake, stimulate root growth, and enhance soil microbial activity for better crop performance.",
    fit: ["Humic Acids", "Root Stimulation", "Nutrient Uptake"],
    category: "Base Granules",
    tagline: "Unlock your soil's full potential with humic acids.",
    description:
      "Humic Based Granules are enriched with humic acids — natural organic compounds that play a vital role in soil health and plant nutrition. These granules improve nutrient uptake efficiency, stimulate root growth, and enhance soil microbial activity.\n\nHumic acids act as a natural chelating agent, making essential nutrients more available to plants while improving soil structure and water retention.",
    howToApply: [
      {
        step: "01",
        title: "Soil Application",
        detail: "Apply directly to soil and incorporate for improved nutrient availability and root stimulation.",
      },
      {
        step: "02",
        title: "Blended Application",
        detail: "Mix with other fertilizers to enhance their effectiveness and reduce nutrient losses.",
      },
      {
        step: "03",
        title: "Transplanting",
        detail: "Apply in the planting hole during transplanting to reduce transplant shock and promote rapid establishment.",
      },
    ],
    benefits: [
      { title: "Enhanced Nutrient Uptake", detail: "Humic acids chelate nutrients, making them more available for plant absorption." },
      { title: "Root Growth Stimulation", detail: "Promotes vigorous root development for stronger, healthier plants." },
      { title: "Soil Microbial Activity", detail: "Stimulates beneficial microbial populations for improved soil health." },
      { title: "Improved Cation Exchange", detail: "Enhances the soil's ability to hold and exchange essential nutrients." },
    ],
    specs: [
      { label: "Type", value: "Humic Acid Fertilizer" },
      { label: "Form", value: "Granules" },
      { label: "Active Component", value: "Humic and Fulvic Acids" },
      { label: "Application", value: "Soil application, blending, transplanting" },
      { label: "Category", value: "Base Granules" },
    ],
  },
  {
    slug: "enriched-base-granules",
    title: "Enriched Base Granules",
    imageUrl: "/images/products/enriched-base-granules.png",
    summary:
      "Nutrient-enriched base granules fortified with additional micronutrients and organic actives for targeted crop nutrition and enhanced soil fertility.",
    fit: ["Nutrient Fortified", "Micronutrients", "Targeted Nutrition"],
    category: "Base Granules",
    tagline: "Fortified granules for superior crop nutrition.",
    description:
      "Enriched Base Granules are fortified with additional micronutrients and organic active ingredients to address specific soil deficiencies and crop requirements. These granules go beyond basic nutrition to deliver targeted benefits.\n\nThe enrichment process ensures that essential micronutrients like Zinc, Boron, Iron, and Manganese are uniformly distributed throughout each granule for consistent field performance.",
    howToApply: [
      {
        step: "01",
        title: "Soil Application",
        detail: "Apply directly to soil based on soil test recommendations for targeted nutrient correction.",
      },
      {
        step: "02",
        title: "Blended Use",
        detail: "Blend with base fertilizers to create customized nutrient packages for specific crops.",
      },
      {
        step: "03",
        title: "Fertigation",
        detail: "Suitable for use in fertigation systems where precision nutrient delivery is required.",
      },
    ],
    benefits: [
      { title: "Micronutrient Fortified", detail: "Enriched with essential micronutrients for complete crop nutrition." },
      { title: "Targeted Solutions", detail: "Formulated to address specific soil deficiencies and crop requirements." },
      { title: "Uniform Distribution", detail: "Each granule contains a consistent blend of nutrients for even field application." },
      { title: "Enhanced Efficiency", detail: "Combined macro and micro nutrition in a single product for simplified application." },
    ],
    specs: [
      { label: "Type", value: "Enriched Base Granules" },
      { label: "Form", value: "Granules" },
      { label: "Micronutrients", value: "Zinc, Boron, Iron, Manganese + more" },
      { label: "Application", value: "Soil, blending, fertigation" },
      { label: "Category", value: "Base Granules" },
    ],
  },
  {
    slug: "other-nutrients-base-granules",
    title: "Other Nutrients Base Granules",
    imageUrl: "/images/products/other-nutrients-base-granules.png",
    summary:
      "Specialty base granules formulated with specific secondary nutrients and trace elements for specialized crop nutrition requirements.",
    fit: ["Secondary Nutrients", "Specialty", "Custom"],
    category: "Base Granules",
    tagline: "Specialty nutrition for specific crop needs.",
    description:
      "Other Nutrients Base Granules are specialty formulations designed to deliver specific secondary nutrients and trace elements that are essential for optimal crop growth. These granules address niche nutritional requirements that standard fertilizers may not provide.\n\nJ K Fertilizers can formulate these granules with Calcium, Magnesium, Sulfur, Silica, and other trace elements based on specific soil and crop requirements.",
    howToApply: [
      {
        step: "01",
        title: "Soil Amendment",
        detail: "Apply based on soil analysis to correct specific secondary nutrient or trace element deficiencies.",
      },
      {
        step: "02",
        title: "Blended Application",
        detail: "Mix with primary fertilizers to create a complete and balanced nutrition program.",
      },
      {
        step: "03",
        title: "Foliar Alternative",
        detail: "Use as a soil-applied alternative to foliar sprays for sustained nutrient supply.",
      },
    ],
    benefits: [
      { title: "Specialized Nutrition", detail: "Targets specific secondary nutrient and trace element requirements for optimal growth." },
      { title: "Custom Formulation", detail: "Can be tailored to address specific soil deficiencies identified through testing." },
      { title: "Quality Inputs", detail: "Manufactured with high-grade raw materials for consistent nutrient content." },
      { title: "Versatile Use", detail: "Suitable for a wide range of crops and application methods." },
    ],
    specs: [
      { label: "Type", value: "Specialty Nutrient Granules" },
      { label: "Form", value: "Granules" },
      { label: "Nutrients", value: "Calcium, Magnesium, Sulfur, Silica, Trace Elements" },
      { label: "Application", value: "Soil amendment, blending" },
      { label: "Category", value: "Base Granules" },
    ],
  },
  {
    slug: "base-granules",
    title: "Base Granules",
    imageUrl: "/images/products/base-granules.png",
    summary:
      "High-quality multi-purpose base granules that serve as the foundation for various fertilizer formulations. Made from premium mineral and organic inputs.",
    fit: ["Multi-purpose", "Carrier", "Foundation"],
    category: "Base Granules",
    tagline: "The versatile foundation for your formulations.",
    description:
      "Base Granules from J K Fertilizers are high-quality, multi-purpose granules that serve as the foundation for various fertilizer and soil amendment products. Made from premium mineral and organic inputs, these granules are versatile carriers suitable for direct application or as a substrate for coating and blending.\n\nOur Base Granules are manufactured with consistent quality, ensuring uniform particle size, hardness, and density for reliable performance in the field.",
    howToApply: [
      {
        step: "01",
        title: "Direct Soil Application",
        detail: "Use as a standalone soil amendment for general soil health improvement and nutrient supply.",
      },
      {
        step: "02",
        title: "Coating Substrate",
        detail: "Ideal base material for coating with liquid or dry active ingredients for value-added products.",
      },
      {
        step: "03",
        title: "Blending Base",
        detail: "Perfect foundation for creating homogeneous fertilizer blends with other nutrients and amendments.",
      },
    ],
    benefits: [
      { title: "Premium Quality", detail: "Manufactured with high-grade inputs for consistent quality and performance." },
      { title: "Uniform Granules", detail: "Consistent particle size ensures even distribution during application." },
      { title: "Versatile Use", detail: "Suitable for direct application, coating substrate, or blending component." },
      { title: "Reliable Supply", detail: "Manufactured with consistent quality for dependable B2B supply." },
    ],
    specs: [
      { label: "Type", value: "Multi-purpose Base Granules" },
      { label: "Form", value: "Granules (uniform size)" },
      { label: "Inputs", value: "Mineral and organic materials" },
      { label: "Application", value: "Direct, coating substrate, blending" },
      { label: "Category", value: "Base Granules" },
    ],
  },
  {
    slug: "diatomite-silicon",
    title: "Diatomite Silicon",
    imageUrl: "/images/products/diatomite-silicon.png",
    summary:
      "Natural diatomite-based silicon supplement that strengthens plant cell walls, improves stress tolerance, and enhances crop quality and yield.",
    fit: ["Silicon Supplement", "Stress Tolerance", "Crop Quality"],
    category: "Mineral Supplement",
    tagline: "Nature's silicon for stronger, healthier crops.",
    description:
      "Diatomite Silicon is a natural silicon supplement derived from diatomaceous earth. Silicon is a beneficial element that strengthens plant cell walls, improves resistance to pests and diseases, and enhances tolerance to environmental stresses like drought and salinity.\n\nJ K Fertilizers' Diatomite Silicon granules provide a slow-release source of plant-available silicon, ensuring crops receive this valuable element throughout the growing season for improved quality and yield.",
    howToApply: [
      {
        step: "01",
        title: "Soil Application",
        detail: "Apply to soil and incorporate for root zone availability of silicon throughout the season.",
      },
      {
        step: "02",
        title: "Blended Application",
        detail: "Mix with other fertilizers for combined nutrient and silicon delivery in a single application.",
      },
      {
        step: "03",
        title: "Broadcast",
        detail: "Broadcast evenly across the field and incorporate into the soil during land preparation.",
      },
    ],
    benefits: [
      { title: "Strengthens Cell Walls", detail: "Silicon deposits in cell walls create stronger plants resistant to lodging and pests." },
      { title: "Stress Tolerance", detail: "Enhances plant resistance to drought, salinity, heat, and other environmental stresses." },
      { title: "Improved Quality", detail: "Produces stronger stems, better fruit set, and improved crop quality parameters." },
      { title: "Natural Source", detail: "Derived from natural diatomaceous earth for clean, sustainable silicon supplementation." },
    ],
    specs: [
      { label: "Type", value: "Silicon Supplement" },
      { label: "Form", value: "Granules" },
      { label: "Source", value: "Natural Diatomaceous Earth" },
      { label: "Application", value: "Soil application, blending, broadcast" },
      { label: "Category", value: "Mineral Supplement" },
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug: string): Product[] =>
  products.filter((p) => p.slug !== slug);
