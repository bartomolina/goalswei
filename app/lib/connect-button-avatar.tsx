import { Types } from "connectkit";
import makeBlockie from "ethereum-blockies-base64";

const BlockieAvatar = ({ address, ensImage, ensName, size, radius }: Types.CustomAvatarProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        height: size,
        width: size,
      }}
    >
      {ensImage ?
      <img src={ensImage} alt={ensName ?? address} width="100%" height="100%" /> :
      // @ts-ignore
      <img src={makeBlockie(address)} alt={address} width="100%" height="100%" />
    }
    </div>
  );
};

export default BlockieAvatar;
