import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            router.push({ pathname: "/[slug]", query: { slug: "push" } });
          }}
        >
          PUSH
        </button>
      </div>
      <br />
      <div>
        <button
          type="button"
          onClick={() => {
            router.replace({ pathname: "/[slug]", query: { slug: "push" } });
          }}
        >
          REPLAECE
        </button>
      </div>
      <br />
      <div>
        <button
          type="button"
          onClick={() => {
            router.reload();
          }}
        >
          RELOAD
        </button>
      </div>
      <br />
      <div>
        <Link href="/hello">Hello</Link>
      </div>
      <br />
      <div>
        <Link href="/bye">Bye</Link>
      </div>
    </div>
  );
}