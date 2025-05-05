interface SidebarContextType {
	isCollapsed: boolean
}
const Footer = ({ isCollapsed }: SidebarContextType) => {
	return (
		<footer
			className={`fixed bottom-0 m-2 right-[1px] py-4 text-center text-sm rounded-md text-gray-500 border transition-all duration-300 ease-in-out ${
				isCollapsed ? 'w-[calc(100vw-100px)]' : 'w-[calc(100vw-291px)]'
			} bg-sidebar`}
		>
			CRM.noventer platformasi <strong>NovEnter</strong> jamosi tomonidan
			yaratildi &nbsp;|&nbsp; 2025 © <strong>NovEnter</strong>
		</footer>
	)
}

export default Footer
