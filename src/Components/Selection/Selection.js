import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
} from "react";
import { Fade } from "react-awesome-reveal";

const GroupContext = createContext();

export const SelectionGroup = ({
  SelectedComponent,
  UnselectedComponent,
  defaultItem,
  children,
  className,
  id,
  SelectedItemMask,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsRef = useRef([]);
  const groupRef = useRef(null);
  const [selectedItemRect, setSelectedItemRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const resizeObserver = useRef();

  useEffect(() => {
    if (resizeObserver.current) resizeObserver.current.disconnect();
    resizeObserver.current = new ResizeObserver(() => {
      if (itemsRef.current[selectedItem]) {
        const itemRect = itemsRef.current[selectedItem].getBoundingClientRect();
        const groupRect = groupRef.current.getBoundingClientRect();
        setSelectedItemRect({
          x: itemRect.x - groupRect.x,
          y: itemRect.y - groupRect.y,
          width: itemRect.width,
          height: itemRect.height,
        });
      }
    });
    resizeObserver.current.observe(groupRef.current);
  }, [itemsRef, groupRef, selectedItem]);
  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    setSelectedItem(defaultItem);
  }, [defaultItem]);

  return (
    <div className={`${className} relative except`} ref={groupRef} id={id}>
      <GroupContext.Provider
        value={{
          SelectedComponent: SelectedComponent,
          UnselectedComponent: UnselectedComponent,
        }}
      >
        <div
          className={`absolute w-[100px] h-[40px] top-[${selectedItemRect.y}px] left-[${selectedItemRect.x}px] w-[${selectedItemRect.width}px] h-[${selectedItemRect.height}px] transition ease-in-out ${SelectedItemMask}`}
        ></div>
        <Fade cascade damping={0.2}>
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              selected: index === selectedItem,
              onClick: () => handleItemClick(index),
              setRef: (el) => (itemsRef.current[index] = el),
            });
          })}
        </Fade>
      </GroupContext.Provider>
    </div>
  );
};

export const SelectionItem = ({
  selected,
  onClick,
  SelectedItem,
  UnselectedItem,
  children,
  setRef,
  disabled,
}) => {
  const { SelectedComponent, UnselectedComponent } = useContext(GroupContext);
  const [selectedA, setSelectedA] = useState(selected);

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        setSelectedA(selected);
      }, 180);
    } else {
      setSelectedA(selected);
    }
  }, [selected]);

  return (
    <div
      onClick={() => {
        if (!disabled) onClick();
      }}
      className="cursor-pointer select-none w-full relative"
      ref={(el) => setRef(el)}
    >
      {selectedA
        ? SelectedItem
          ? SelectedItem
          : SelectedComponent
        : UnselectedItem
        ? UnselectedItem
        : UnselectedComponent}
      {children}
    </div>
  );
};
