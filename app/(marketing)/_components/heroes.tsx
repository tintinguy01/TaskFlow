import Image from "next/image";

const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                    <Image src="/girl.png" fill className="object-contain dark:hidden" alt="Girl" />
                    <Image src="/girl-dark.png" fill className="object-contain hidden dark:block" alt="Girl" />
                </div>
                <div className="relative h-[400px] w-[400px] hidden md:block">
                    <Image src="/boy.png" fill className="object-contain" alt="Boy" />
                    <Image src="/boy-dark.png" fill className="object-contain hidden dark:block" alt="Boy" />
                </div>
            </div>
        </div>
    )
}

export default Heroes;