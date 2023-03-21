import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/htrieu.jpg';
import { Cart, Chat, Notifications, UserProfile } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
            type="button"
            onClick={customFunc}
            style={{ color }}
            className="relative text-lg rounded-full p-3 hover:bg-light-gray"
        >
            <span
                style={{ background: dotColor }}
                className="absolute text-base inline-flex rounded-full h-2 w-2 right-2 top-2"
            >
                {icon}
            </span>
        </button>
    </TooltipComponent>
);
const NavBar = () => {
    const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize, currentColor } =
        useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className="flex justify-between p-2 md:mx-6 relative">
            <NavButton
                title="Menu"
                customFunc={() => setActiveMenu((prevMenu) => !prevMenu)}
                color={currentColor}
                icon={<AiOutlineMenu className="text-base" />}
            ></NavButton>
            <div className="flex">
                <NavButton
                    title="Cart"
                    customFunc={() => handleClick('cart')}
                    color={currentColor}
                    icon={<FiShoppingCart className="text-base" />}
                ></NavButton>
                <NavButton
                    title="Chat"
                    dotColor="#03c9d7"
                    customFunc={() => handleClick('chat')}
                    color={currentColor}
                    icon={<BsChatLeft className="text-base" />}
                ></NavButton>
                <NavButton
                    title="Notification"
                    dotColor="#03c9d7"
                    customFunc={() => handleClick('notification')}
                    color={currentColor}
                    icon={<RiNotification3Line className="text-base" />}
                ></NavButton>

                <TooltipComponent content="Profile" position="BottomCenter">
                    <div
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick('userProfile')}
                    >
                        <img src={avatar} className="rounded-full w-8 h-8" alt="" />
                        <p>
                            <span className="text-gray-400 text-14">Hi, </span>{' '}
                            <span className="text-gray-400 text-14 font-bold font-">Hai Trieu</span>
                        </p>
                        <MdKeyboardArrowDown className="text-gray-400 text-14" />
                    </div>
                </TooltipComponent>

                {isClicked.cart && <Cart />}
                {isClicked.chat && <Chat />}
                {isClicked.userProfile && <UserProfile />}
                {isClicked.notification && <Notifications />}
            </div>
        </div>
    );
};

export default NavBar;
