import { useState } from "react";
import Modal from "react-responsive-modal";
import { Carousel } from "react-responsive-carousel";
import { Bounce } from "react-awesome-reveal";
import Skeleton from "react-loading-skeleton";

export const ImageView = ({ images = [] }) => {
  const [show, setShow] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-[8px] h-max rounded-[10px] p-[8px] w-full bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
        {images[0] ? (
          <Bounce>
            <img
              alt=""
              src={images[0]}
              onClick={() => {
                setSelectedIdx(0);
                setShow(true);
              }}
              className="w-full cursor-pointer rounded-[10px]"
            />
          </Bounce>
        ) : (
          <Skeleton
            className="w-full min-h-[300px] cursor-pointer rounded-[10px]"
            style={{ borderRadius: "10px" }}
          />
        )}

        <div className="grid grid-cols-2 gap-[10px] w-full h-max">
          {images.slice(1, 5).map((image, index) => {
            return (
              <Bounce cascade key={index}>
                {image ? (
                  <img
                    alt=""
                    src={image}
                    onClick={() => {
                      setSelectedIdx(index + 1);
                      setShow(true);
                    }}
                    className="w-full cursor-pointer rounded-[10px]"
                  />
                ) : (
                  <Skeleton
                    className="w-full min-h-[120px] cursor-pointer rounded-[10px]"
                    style={{ borderRadius: "10px" }}
                  />
                )}
              </Bounce>
            );
          })}
        </div>
      </div>
      <Modal
        open={show}
        onClose={() => setShow(false)}
        center
        classNames={{
          modal:
            "min-w-[350px] h-max rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
        }}
      >
        <Carousel className="mt-[40px]" selectedItem={selectedIdx}>
          {images.map((image, i) => {
            return (
              <img key={i} alt="" src={image} className="rounded-[8px] h-max" />
            );
          })}
        </Carousel>
      </Modal>
    </>
  );
};
