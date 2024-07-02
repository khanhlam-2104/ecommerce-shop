const FormWrap = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="
              min-h-screen
              h-full
              flex
              items-center
              justify-center
              py-12
              ">
        <div className="max-w-[650px]
              w-full
              flex
              flex-col
              gap-6
              items-center
              shadow-xl
              shadow-slate-200
              rounded-md
              p-6
              sm:p-8
              ">
          {children}
        </div>
      </div>
    );
  };
  
  export default FormWrap;