import { CheckIcon} from "lucide-react";
import { AnimatedSubscribeButton } from "@/components/ui/animated-subscribe-button";

export function AnimatedFollowButton() {

  return (
    <AnimatedSubscribeButton
      buttonColor="#000000"
      buttonTextColor="#ffffff"
      subscribeStatus={false}
      initialText={
        <span className="group inline-flex items-center">
          Follow{" "}
          {/* <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" /> */}
        </span>
      }
      changeText={
        <span className="group inline-flex items-center">
          <CheckIcon className="mr-2 size-4" />
          Following{" "}
        </span>
      }
    />
  );
}
