import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';

import {
    Ecommerce,
    Orders,
    Calendar,
    Employees,
    Stacked,
    Pyramid,
    Customer,
    Kanban,
    Area,
    Bar,
    Pie,
    Line,
    Financial,
    ColorPicker,
    ColorMapping,
    Editor,
} from './pages';

import { useStateContext } from './contexts/ContextProvider';
import './App.css';

const App = () => {
    const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    <div style={{ zIndex: '1000' }} className="fixed right-4 bottom-4">
                        <TooltipComponent content="Settings" position="Top">
                            <button
                                type="button"
                                onClick={() => setThemeSettings(true)}
                                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                                style={{ background: currentColor, borderRadius: '50%' }}
                            >
                                <FiSettings></FiSettings>
                            </button>
                        </TooltipComponent>
                    </div>
                    {activeMenu ? (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                            <Sidebar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg">
                            <Sidebar />
                        </div>
                    )}
                    <div
                        className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
                            activeMenu ? 'md:ml-72' : 'flex-2'
                        }`}
                    >
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                            <Navbar />
                        </div>

                        <div>
                            {themeSettings && <ThemeSettings />}

                            <Routes>
                                {/* Dashbroad */}
                                <Route path="/" element={<Ecommerce />} />
                                <Route path="/ecommerce" element={<Ecommerce />} />

                                {/* Page */}
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/employees" element={<Employees />} />
                                <Route path="/customers" element={<Customer />} />
                                {/* App */}
                                <Route path="/kanban" element={<Kanban />} />
                                <Route path="/editor" element={<Editor />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/color-picker" element={<ColorPicker />} />

                                {/* Chart */}
                                <Route path="/line" element={<Line />} />
                                <Route path="/area" element={<Area />} />
                                <Route path="/Bar" element={<Bar />} />
                                <Route path="/pie" element={<Pie />} />
                                <Route path="/financial" element={<Financial />} />
                                <Route path="/color-mapping" element={<ColorMapping />} />
                                <Route path="/pyramid" element={<Pyramid />} />
                                <Route path="/stacked" element={<Stacked />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
