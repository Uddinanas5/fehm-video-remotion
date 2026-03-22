import { Composition } from 'remotion';
import { MainVideo } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SALVideo"
        component={MainVideo}
        durationInFrames={1051}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
