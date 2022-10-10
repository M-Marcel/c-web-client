import clsx from "clsx";

const WallectConnectIcon = ({ twclx }: { twclx?: string }) => {
  return (
    <div>
      <img
        src="/logos/wallet-connect-logo.png"
        alt="wallet-connect-logo"
        className={clsx(twclx)}
      />
    </div>
  );
};

export default WallectConnectIcon;
