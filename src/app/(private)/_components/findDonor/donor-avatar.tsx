import Image from "next/image";

interface DonorAvatarProps {
    name: string;
    image?: string | null;
}

export default function DonorAvatar({
    name,
    image,
}: DonorAvatarProps) {
    return (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100">
            {image ? (
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-slate-400">
                    {name.charAt(0).toUpperCase()}
                </div>
            )}
        </div>
    );
}