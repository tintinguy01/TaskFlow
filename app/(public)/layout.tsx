const PublicLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="flex flex-col min-h-screen dark:bg-[#1F1F1F]">
            {children}
        </div>
     );
}
 
export default PublicLayout;
