interface CardProps {
  data: {
    name: string;
    imageUrl: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
  };
}

const Card = ({ data }: CardProps) => {
  const { name, imageUrl, type, hp, attack, defense } = data;
  return (
    <div className="bg-yellow-400 w-[350px] h-[490px] rounded-xl m-2 p-3 flex justify-center items-center">
      <div className="bg-slate-400 w-full h-full  flex flex-col items-center">
        <div className="flex flex-col items-center w-full p-5">
          <div className="flex justify-between w-full items-end">
            <div className="font-bold text-xl">{name}</div>
            <p
              className=" text-gray-700 text-base tooltip-top tooltip z-20 "
              data-tip="Hacker Points"
            >
              {hp} HP
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 via-yellow-700 to-yellow-400 p-2 w-full aspect-[5/4] object-cover overflow-hidden relative ">
            <img
              className="relative inset-0 z-10 object-cover h-full w-full"
              src={imageUrl}
              alt={name}
            />
            <div className="absolute inset-0 z-0 w-[20%] h-[200%] bg-gradient-to-r from-transparent via-yellow-100 to-transparent  animate-flash"></div>
          </div>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">Type: {type}</p>
          <p className="text-gray-700 text-base">Attack: {attack}</p>
          <p className="text-gray-700 text-base">Defense: {defense}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
