import clsx from "clsx";

interface InputTextProps {
  massageError?: string;
  isError?: boolean;
  value?: string | number | boolean | null | undefined | "";
  disabled? : boolean
}

export default function InputText({
  massageError,
  isError,
  value,
  disabled = false,
  ...props
}: InputTextProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
      value={value as string}
        {...props}
        className={clsx(`border border-black p-2 w-full rounded-lg mt-8`, {
          "border border-red-500 p-2 w-full rounded-lg": isError,
          "border-gray-100 bg-gray-100": disabled
        })}
      />
      {}
      {isError && (
        <span className="text-red-500 text-sm">
          {massageError ? massageError : "Ini Wajib Diisi"}
        </span>
      )}
    </>
  );
}