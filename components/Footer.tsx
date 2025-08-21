const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
                        <a href="#" className="hover:text-white font-mono">About</a>
                        <a href="#" className="hover:text-white font-mono">Docs</a>
                        <a href="#" className="hover:text-white font-mono">GitHub</a>
                        <a href="#" className="hover:text-white font-mono">Terms</a>
                        <a href="#" className="hover:text-white font-mono">Privacy</a>
                    </div>
                    <div className="text-sm font-mono">
                        © 2025 Devy. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
