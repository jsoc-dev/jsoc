import jsocSvg from "@/app/icon.svg";

export function JsocLogo() {
  return (
    <div className="flex items-center gap-1">
      <img src={jsocSvg.src} className="w-10 h-10" />
      <span className="text-4xl font-semibold font-logo tracking-wide">
        JSOC
      </span>
    </div>
  );
}
