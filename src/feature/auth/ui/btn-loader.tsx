import { Loader2Icon } from "lucide-react";

export function BtnLoader() {
  return (
    <div className='inline-flex items-center'>
      <Loader2Icon className='animate-spin'></Loader2Icon>
      {"Please wait..."}
    </div>
  );
}
