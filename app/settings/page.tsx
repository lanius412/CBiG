import { ModeToggle } from "@/components/mode-toggle";

const Settings = () => {
  return (
    <div className="p-6 flex items-center overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-4xl flex flex-col grow">
        <section className="flex justify-between mb-3 max-w-96">
          <p className="flex items-center ml-3">Theme</p>
          <p>
            <ModeToggle />
          </p>
        </section>
      </div>
    </div>
  );
};

export default Settings;
