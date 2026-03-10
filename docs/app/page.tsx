import Link from "next/link";

const features = [
  ["Dynamic", "No fixed rows or column configuration."],
  ["JSON-Driven", "Auto configured based on JSON data."],
  ["Adaptive UI", "Powered by popular UI libraries."],
];

const links = [
  ["Documentation", "/documentation/grid/"],
  ["Playground", "/playground/grid/"],
];

export default function Page() {
  return (
    <div className="flex flex-col min-h-full py-12">
      {/* Hero section */}
      <section className="text-center">
        <h1 className="text-[clamp(2rem,5vw,4rem)] mb-5">
          <span>Introducing </span>
          <span className="font-logo text-[clamp(3rem,5vw,5rem)] font-semibold tracking-wide">JSOC</span> Grid
        </h1>

        <p className="text-[clamp(1rem,3vw,1.5rem)] text-gray-700">
          Dynamic, JSON-driven and adaptive UI grid.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {links.map(([text, path], index) => (
            <Link
              className={
                "link-button border border-black text-[clamp(0.9rem,3vw,1rem)]"
              }
              key={index}
              href={path}
            >
              {text} <span aria-hidden>↗︎</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-14 flex flex-col space-y-12 items-center">
        {features.map(([title, description], index) => (
          <div
            key={index}
            className="inline-flex items-center border-2 border-dashed border-black rounded-2xl px-8 py-6 max-w-3xl w-[90%]"
          >
            <div className="w-[45%] text-right pr-4">
              <h2 className="wrap-break-word text-[clamp(1.05rem,4vw,2rem)] font-semibold">
                {title}
              </h2>
            </div>

            <span className="border-r border-gray-300 self-stretch"></span>

            <p className="wrap-break-word w-[55%] pl-4 text-[clamp(0.75rem,3vw,1rem)] text-gray-700">
              {description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
