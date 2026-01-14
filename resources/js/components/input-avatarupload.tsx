import { useRef, useState } from "react";
import SVGUpload from "./ui/svg-upload";

export default function InputAvatarUpload() {

    const inputRef = useRef(null);
    const [AvatarImagePreview, setAvatarImagePreview] = useState("/images/Avatar/ProfileAvatar.jpg");

    function ClickInputFile() {
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement).click();
        }
    }

    function HandleChangeInputFile(input: HTMLInputElement) {
        let _src = "/images/Avatar/ProfileAvatar.jpg";
        if (input.files && input.files.length > 0) {
            const _files = input.files;
            if (_files) {
                _src = URL.createObjectURL(_files[0]);
            }
        }
        setAvatarImagePreview(_src);
    }

    return (
        <>
            <p>Avatar</p>
            <div className="w-full relative aspect-square bg-brand-white border-[1px] border-gray-300 rounded-md overflow-hidden cursor-pointer" onClick={ClickInputFile} onChange={(e) => { HandleChangeInputFile(e.target as HTMLInputElement); }}>
                <input ref={inputRef} type="file" className="hidden" name="input_avatarprofile" accept="image/*" />
                <div className="absolute flex flex-col justify-center w-full h-full bg-[#000000a7] opacity-0 hover:opacity-100 transition-all duration-200">
                    <div className="text-center">
                        <div className="w-8 aspect-square mx-auto">
                            <SVGUpload />
                        </div>
                        <p className="text-brand-white">Sube tu avatar</p>
                    </div>
                </div>
                <img src={AvatarImagePreview} className="w-full h-full object-cover object-center" />
            </div>
        </>
    )
}