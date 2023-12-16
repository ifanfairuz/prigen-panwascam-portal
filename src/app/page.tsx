import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-2xl text-center font-bold mb-6">
          Portal Bantuan Panwaslu Kecamatan Prigen
        </h1>
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <Link
            href="/form-a-generator"
            className="p-4 rounded-full shadow-xl text-center font-medium bg-green-400 text-green-900 hover:bg-green-500"
          >
            Form A Generator
          </Link>
          <div></div>
        </div>
      </div>
    </main>
  );
}
