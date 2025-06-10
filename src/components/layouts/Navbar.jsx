import { useState, useEffect, useRef } from "react";
import {
  FiMapPin,
  FiTrash2,
  FiTruck,
  FiShield,
  FiCalendar,
  FiCreditCard,
  FiMenu,
  FiX,
} from "react-icons/fi";

const STEPS = [
  { label: "Postcode", icon: FiMapPin },
  { label: "Waste Type", icon: FiTrash2 },
  { label: "Select Skip", icon: FiTruck },
  { label: "Permit Check", icon: FiShield },
  { label: "Choose Date", icon: FiCalendar },
  { label: "Payment", icon: FiCreditCard },
];

export default function BookingNavbar() {
  const [activeStep, setActiveStep] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside drawer
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    };
    document[drawerOpen ? "addEventListener" : "removeEventListener"](
      "mousedown",
      handleClickOutside
    );
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerOpen]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setDrawerOpen(false);
  };

  const StepItem = ({ step, index }) => {
    const isActive = index === activeStep;
    return (
      <div
        key={step.label}
        role="button"
        tabIndex={0}
        onClick={() => handleStepClick(index)}
        onKeyDown={(e) => e.key === "Enter" && handleStepClick(index)}
        aria-current={isActive ? "step" : undefined}
        className={`step-link ${
          isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
        }`}>
        <step.icon size={18} aria-hidden="true" />
        <span className="text-sm font-medium">{step.label}</span>
      </div>
    );
  };

  const NavContent = () => (
    <nav className="nav">
      {STEPS.map((step, index) => (
        <StepItem key={step.label} step={step} index={index} />
      ))}
    </nav>
  );

  return (
    <div className="nav-container">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header">
          <h2 className="nav-title">We want waste</h2>
          <button
            className="drawer-toggle"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label={drawerOpen ? "Close Menu" : "Open Menu"}>
            {drawerOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobile && drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div ref={drawerRef} className="drawer-container">
            <div className="drawer-close">
              <h3 className="steps">Steps</h3>
              <button
                className="close-drawer-icon"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close Drawer">
                <FiX size={20} />
              </button>
            </div>
            <div className="overflow-y-auto px-2 py-4">
              <NavContent />
            </div>
          </div>
        </>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="desktop-nav">
          <NavContent />
        </div>
      )}
    </div>
  );
}
