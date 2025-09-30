// Minimal dataset with at least 5 images per subsection
// Images from Unsplash (demo). Replace with your assets when needed.

const make = (arr) => arr;

export const photosSections = {
  // Outfit
  outfitBridalLehenga: {                                  
    group: 'Outfit',
    title: 'Bridal Lehenga',
    images: make([
      'https://www.zarikaariindia.com/cdn/shop/products/114_720x.jpg?v=1672454118',
      'https://www.zarikaariindia.com/cdn/shop/products/112-1_360x.jpg?v=1672454013',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX5dLIwSpQHRHqpv_iidl5oa2OkApVRJDPd6avE5FlRzjs51fz5V7_qcSzEfOyRPB3AMQ&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFFgaQ78NDmvVfvSJk-3UcDSRbQpuGbYi4w&s',
      'https://www.mohifashion.com/cdn/shop/files/1732Chickoo.jpg?v=1707595422&width=1946'
    ])
  },
  outfitWeddingSarees: {
    group: 'Outfit',
    title: 'Wedding Sarees',
    images: make([
      'https://kanchidesigners.com/wp-content/uploads/2024/04/Double-shade-wedding-saree.jpg',
      'https://www.zarikaariindia.com/cdn/shop/products/114_720x.jpg?v=1672454118',
      'https://www.studio149fashion.com/cdn/shop/files/S149xDA-137copy.jpg?v=1721111393&width=533',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRUCsZNvwr_cZGGYs92-vNHlyZM2hsCh-ZbA&s',
      'https://cdn.shopify.com/s/files/1/0049/3649/9315/files/SAUS0043127_BEIGE_4_large.jpg?v=1748425206'
    ])
  },
  outfitEngagement: {
    group: 'Outfit',
    title: 'Engagement', 
    images: make([
      'https://www.shaadidukaan.com/vogue/wp-content/uploads/2022/11/image-306-820x1024.png',
      'https://cdn0.weddingwire.in/article/2418/original/1280/jpg/128142-engagement-dresses-abhinav-mishra.jpeg',
      'https://img.faballey.com/images/Product/XKS13032A/d3.jpg',
      'https://img.faballey.com/images/Product/XKS13033Z/d3.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB48RrKGOLkJXrju9ppDzfdVrTi-yi1Met15WX1uBxL6IWscxoQBjEsSjuOI5YmratCWs&usqp=CAU'
    ])
  },
  outfitMehndi: {
    group: 'Outfit',
    title: 'Mehndi',
    images: make([
      'https://www.shutterstock.com/image-photo/indian-bridel-mehandi-art-full-600nw-2460594957.jpg',
      'https://img.freepik.com/free-photo/indian-wedding-bangles-mehandi-henna-coloured-hands-with-reflective-ornament_8353-9783.jpg?semt=ais_hybrid&w=740&q=80',
      'https://img.freepik.com/free-photo/indian-wedding-bangles-mehandi-henna-coloured-hands-with-reflective-ornament_8353-9783.jpg?semt=ais_hybrid&w=740&q=80',
      'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/6811d6e9db9e31001dc78200.jpg',
      'https://giftlaya.com/_next/image?url=https%3A%2F%2Fcdn.giftlaya.com%2Fimages%2F62%2Ff01d3cea-caa2-405e-b5fd-ed795a10c554.webp&w=3840&q=75'
    ])
  },
  outfitBlouseDesigns: {
    group: 'Outfit',
    title: 'Blouse Designs',
    images: make([
      'https://cdn.shopify.com/s/files/1/0683/1800/3511/files/Back_cut-out_design_blouse_flickr_9a658794-11b3-49e7-b071-2bc7ca009efe_480x480.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh6793H_mn13F41_EPYO8yJsY-MMSA8eQhb5VSxemPPILDSv9RN9Txva9YTIVqTySbHmg&usqp=CAU',
      'https://i.pinimg.com/736x/71/26/8c/71268c7ba1ffd7e0b2be7a839e791d97.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOJJGw4lx1GxOVYb10xv3pgdk_PXrJQlJjjg&s',
      'https://images.shaadisaga.com/shaadisaga_production/photos/pictures/000/905/798/new_medium/that_moment_photog.jpg?1559826832'
    ])
  },

  // Jewellery & Accessories
  jewelBridalJewellery: {
    group: 'Jewellery & Accessories',
    title: 'Bridal Jewellery',
    images: make([
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
      'https://images.unsplash.com/photo-1520975619016-7f61d4dc18c5?w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800'
    ])
  },
  jewelEngagementRings: {
    group: 'Jewellery & Accessories',
    title: 'Engagement Rings',
    images: make([
      'https://images.unsplash.com/photo-1514846326714-7c689d220ad6?w=800',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
      'https://images.unsplash.com/photo-1513801641355-3f6823f09a5b?w=800',
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800'
    ])
  },
  jewelFloral: {
    group: 'Jewellery & Accessories',
    title: 'Floral Jewellery',
    images: make([
      'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800',
      'https://images.unsplash.com/photo-1520975619016-7f61d4dc18c5?w=800',
      'https://images.unsplash.com/photo-1520975922210-29f44b0a31ab?w=800',
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800'
    ])
  },

  // Mehndi
  mehndiArabic: {
    group: 'Mehndi',
    title: 'Arabic',
    images: make([
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800',
      'https://images.unsplash.com/photo-1591604466107-f2d3c067b956?w=800',
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800'
    ])
  },
  mehndiDesigns: {
    group: 'Mehndi',
    title: 'Mehndi Designs',
    images: make([
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800',
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800',
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800'
    ])
  },
  mehndiSimple: {
    group: 'Mehndi',
    title: 'Simple',
    images: make([
      'https://images.unsplash.com/photo-1520975693414-56c03c2f0b3b?w=800',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800',
      'https://images.unsplash.com/photo-1550639521-124e977d1f64?w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800'
    ])
  },
  mehndiUnique: {
    group: 'Mehndi',
    title: 'Unique',
    images: make([
      'https://images.unsplash.com/photo-1591604466107-f2d3c067b956?w=800',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
      'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=800',
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800',
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800'
    ])
  },

  // Decor & Ideas
  decorWedding: {
    group: 'Decor & Ideas',
    title: 'Wedding Decor',
    images: make([
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800',
      'https://images.unsplash.com/photo-1517511620798-cec17d428bc0?w=800'
    ])
  },
  decorBridalEntry: {
    group: 'Decor & Ideas',
    title: 'Bridal Entry',
    images: make([
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800',
      'https://images.unsplash.com/photo-1514846326714-7c689d220ad6?w=800',
      'https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=800',
      'https://images.unsplash.com/photo-1520975619016-7f61d4dc18c5?w=800',
      'https://images.unsplash.com/photo-1517511620798-cec17d428bc0?w=800'
    ])
  },
  decorGroomEntry: {
    group: 'Decor & Ideas',
    title: 'Groom Entry',
    images: make([
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      'https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=800',
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800',
      'https://images.unsplash.com/photo-1514846326714-7c689d220ad6?w=800',
      'https://images.unsplash.com/photo-1517511620798-cec17d428bc0?w=800'
    ])
  },
  decorWeddingGames: {
    group: 'Decor & Ideas',
    title: 'Wedding Games',
    images: make([
      'https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=800',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
      'https://images.unsplash.com/photo-1517511620798-cec17d428bc0?w=800'
    ])
  },

  // Wedding Card Designs
  cardsDesigns: {
    group: 'Wedding Card Designs',
    title: 'Designs',
    images: make([
      'https://images.unsplash.com/photo-1495490140452-5a226aef25d2?w=800',
      'https://images.unsplash.com/photo-1489528792647-46ec39027556?w=800',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800'
    ])
  },
  cardsGifts: {
    group: 'Wedding Card Designs',
    title: 'Wedding Gifts',
    images: make([
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800',
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800',
      'https://images.unsplash.com/photo-1489528792647-46ec39027556?w=800',
      'https://images.unsplash.com/photo-1495490140452-5a226aef25d2?w=800'
    ])
  },
  cardsInvitations: {
    group: 'Wedding Card Designs',
    title: 'Wedding Invitations',
    images: make([
      'https://images.unsplash.com/photo-1495490140452-5a226aef25d2?w=800',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
      'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800',
      'https://images.unsplash.com/photo-1489528792647-46ec39027556?w=800',
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800'
    ])
  },

  // Wedding Photography
  photoPreWedding: {
    group: 'Wedding Photography',
    title: 'Pre Wedding Shoot',
    images: make([
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800',
      'https://images.unsplash.com/photo-1514846326714-7c689d220ad6?w=800',
      'https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=800'
    ])
  },
  photoWedding: {
    group: 'Wedding Photography',
    title: 'Wedding',
    images: make([
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800',
      'https://images.unsplash.com/photo-1514846326714-7c689d220ad6?w=800',
      'https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=800'
    ])
  },
  photoPoses: {
    group: 'Wedding Photography',
    title: 'Wedding Photoshoot & Poses',
    images: make([
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      'https://images.unsplash.com/photo-1514846326714-7c689d220ad6?w=800',
      'https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?w=800',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      'https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=800'
    ])
  },

  // Groom Wear
  groomSherwani: {
    group: 'Groom Wear',
    title: 'Sherwani for Groom',
    images: make([
      'https://images.unsplash.com/photo-1520975922210-29f44b0a31ab?w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1520975693414-56c03c2f0b3b?w=800',
      'https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=800',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800'
    ])
  },
  groomSuits: {
    group: 'Groom Wear',
    title: 'Wedding Suits for Groom',
    images: make([
      'https://images.unsplash.com/photo-1503342217505-b0a15cf70489?w=800',
      'https://images.unsplash.com/photo-1520975922210-29f44b0a31ab?w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1519167758481-83f142b8fb9c?w=800',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800'
    ])
  },

  // Bridal Makeup & Hair
  makeupBridal: {
    group: 'Bridal Makeup & Hair',
    title: 'Bridal Makeup',
    images: make([
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800'
    ])
  },
  makeupHairstyles: {
    group: 'Bridal Makeup & Hair',
    title: 'Bridal Hairstyles',
    images: make([
      'https://images.unsplash.com/photo-1556228724-4c1b4e6f1d4b?w=800',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800',
      'https://images.unsplash.com/photo-1544168190-79c17527004f?w=800',
      'https://images.unsplash.com/photo-1556228724-4c1b4e6f1d4b?w=800'
    ])
  },
  makeupEngagement: {
    group: 'Bridal Makeup & Hair',
    title: 'Engagement',
    images: make([
      'https://images.unsplash.com/photo-1519744346362-6f6d3b3f3b9f?w=800',
      'https://images.unsplash.com/photo-1530563885674-66db50a1af19?w=800',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800',
      'https://images.unsplash.com/photo-1503342452485-86f7beaf9da5?w=800',
      'https://images.unsplash.com/photo-1519744346362-6f6d3b3f3b9f?w=800'
    ])
  },
  makeupMehndi: {
    group: 'Bridal Makeup & Hair',
    title: 'Mehndi',
    images: make([
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800',
      'https://images.unsplash.com/photo-1544168190-79c17527004f?w=800',
      'https://images.unsplash.com/photo-1556228724-4c1b4e6f1d4b?w=800',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800'
    ])
  }
};


