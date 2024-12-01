import GridItemInfo from "@/components/GridItemInfo";
import { RootContext } from "@/context/RootContext";
import css from "@/styles/GarmentCard.module.css";
import { IconPencil, IconReplace, IconTrash } from "@tabler/icons-react";
import clsx from "clsx";
import { useContext, useState } from "react";

/** @param {GarmentCardProps} props */
const GarmentCard = (props) => {
  const { garment } = props;

  const { bodyRef, openMenuRef, setActiveTask } = useContext(RootContext);

  const [menuOpen, setMenuOpen] = useState(false);

  function onMoveClick() {
    // @ts-ignore TODO: set collection
    setActiveTask({ garment: {}, action: "move" });
  }

  function onRenameClick() {
    // @ts-ignore TODO: set collection
    setActiveTask({ garment: {}, action: "rename" });
  }

  function onDeleteClick() {
    // @ts-ignore TODO: set collection
    setActiveTask({ garment: {}, action: "delete" });
  }

  return (
    <div className={css["garment-card"]}>
      <div className={clsx(css.frame, menuOpen && css["menu-open"])}>
        <div
          className={css.thumb}
          style={{
            // TODO: set url() from garment
            backgroundImage: null,
          }}
        />
        <div className={css["edit-icon"]}>
          <IconPencil stroke={2.5} />
        </div>
      </div>

      <GridItemInfo
        itemName={garment?.name || "Untitled"}
        contextTitle="Garment Options"
        contextOptions={[
          { label: "Move", icon: <IconReplace />, action: onMoveClick },
          { label: "Rename", action: onRenameClick },
          {
            label: "Delete",
            icon: <IconTrash />,
            action: onDeleteClick,
            destructive: true,
          },
        ]}
        openMenuRef={openMenuRef}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        appendTo={bodyRef}
        menuPlacement="right-end"
        nameoverflowPlacement="bottom-start"
      />
    </div>
  );
};

export default GarmentCard;
