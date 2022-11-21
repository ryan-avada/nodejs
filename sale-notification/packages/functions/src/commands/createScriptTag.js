import Shopify from "shopify-api-node";

(async () => {
  const shopify = new Shopify({
    shopName: 'ryan-trainning.myshopify.com',
    accessToken: 'shpua_7946ea9b03d961643d3263a219e3f4ae'
  });
  await shopify.scriptTag.create({
    event: 'onload',
    src: ''
  })
})();
