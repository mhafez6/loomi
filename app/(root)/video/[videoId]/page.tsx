
import VideoDetailHeader from "@/components/VideoDetailHeader";
import VideoPlayer from "@/components/VideoPlayer";
import { getVideoById } from "@/lib/actions/video";
import { redirect } from "next/navigation";

const Page = async ({ params }: Params) => {

  const { videoId } = await params;

  const result = await getVideoById(videoId);

  if (!result) redirect("/404");
  const {user, video} = result;


  return (
    <main className="wrapper page">
      <VideoDetailHeader {...video} userImg={user?.image} username={user?.name} ownerId={video.userId} videoId={videoId} />

      <section className="video-details">
        <div className="content">
          <VideoPlayer videoId={video.videoId} />
        </div>
      </section>
    </main>
  );
};

export default Page;
