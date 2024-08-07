import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const downloadItem = (data: string, fileName: string) => {

  // const url = window.URL.createObjectURL(new Blob(result.data));
  const link = document.createElement('a');
  link.href = `data:application/pdf;base64,${data}`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);

};
