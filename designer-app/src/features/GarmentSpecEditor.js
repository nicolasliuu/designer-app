import EnumSpecEditor from "@/components/editor/EnumSpec";
import ScrollContainer from "@/components/ScrollContainer";
import Stitches from "@/components/Stitches";
import { RootContext } from "@/context/RootContext";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";

/** @type {{ [K in keyof SpecTypes]: SpecEditor }} */
const Editors = {
  EnumSpec: EnumSpecEditor,
  MeasurementSpec: null, // TODO
  StringSpec: null, // TODO
};

/** @param {{ specs: DefinedSpecSchema }} props */
const GarmentSpecEditor = (props) => {
  const { specs } = props;

  const { sideBarOpen } = useContext(RootContext);

  const [editorStack, setEditorStack] = useState([]);

  useEffect(() => {
    const newStack = specs?.map(({ name, spec }, idx) => {
      /** @type {ValueOf<Editors>} */
      const Editor = Editors[spec.type];

      return Editor && <Editor key={idx} name={name} spec={spec} />;
    });

    setEditorStack(newStack);
  }, [specs]);

  return (
    <div className={clsx("spec-editor", editorStack?.length && "shown")}>
      <Stitches
        type="border"
        svgClass="border-stitch"
        pathClass="border-stitch-path"
        stitchWidth="0.18rem"
      />

      <header>
        <div className="pin" />
        <span className="text-center w-full">Specifications</span>
        <div className="pin" />
      </header>

      <ScrollContainer>
        <div className="scroll-list">{editorStack}</div>
      </ScrollContainer>
    </div>
  );
};

export default GarmentSpecEditor;