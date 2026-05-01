// Subscribes an email to the Shopify customer list with marketing consent.
// Uses the Storefront API customerCreate mutation (no Admin token required).
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_PERMANENT_DOMAIN = "fwentx-3n.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "dda0a67ac5cd405ef77eaabcab8e6a5c";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email acceptsMarketing }
      customerUserErrors { field message code }
    }
  }
`;

function randomPassword() {
  return crypto.randomUUID() + "Aa1!";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: MUTATION,
        variables: {
          input: {
            email,
            password: randomPassword(),
            acceptsMarketing: true,
          },
        },
      }),
    });

    const data = await res.json();
    const errors = data?.data?.customerCreate?.customerUserErrors ?? [];
    const customer = data?.data?.customerCreate?.customer;

    // "CUSTOMER_DISABLED" / "TAKEN" still means the email reached Shopify.
    const benignCodes = ["TAKEN", "CUSTOMER_DISABLED"];
    const realError = errors.find((e: { code?: string }) => !benignCodes.includes(e.code ?? ""));

    if (realError) {
      console.error("Shopify customerCreate error:", errors);
      return new Response(JSON.stringify({ error: realError.message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ ok: true, alreadySubscribed: !customer && errors.length > 0 }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("newsletter-subscribe error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
