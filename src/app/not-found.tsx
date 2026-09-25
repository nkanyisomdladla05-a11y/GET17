import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-40">
      <div className="glass max-w-md rounded-[2rem] p-10 text-center">
        <p className="font-mono text-sm text-brand">404</p>
        <h1 className="mt-2 text-3xl font-extrabold">Page not found</h1>
        <p className="mt-3 text-sm text-mist">
          The chart you are looking for has moved. Head back to the store.
        </p>
        <div className="mt-6">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </div>
    </div>
  );
}
