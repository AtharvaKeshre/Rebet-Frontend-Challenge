"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Lottie from "lottie-react";

// Static assets
import white_close from "@/StaticAssets/white_close.png";
import white_accept from "@/StaticAssets/white_check.png";
import green_left_arrow from "@/StaticAssets/green_left_arrows.png";
import green_right_arrow from "@/StaticAssets/green_right_arrows.png";
import red_left_arrow from "@/StaticAssets/red_left_arrows.png";
import red_right_arrow from "@/StaticAssets/red_right_arrows.png";
import red_button from "@/StaticAssets/red_button.png";
import green_button from "@/StaticAssets/green_button.png";
import red_check from "@/StaticAssets/red_check.png";
import red_close from "@/StaticAssets/red_close.png";
import green_check from "@/StaticAssets/green_check.png";
import green_close from "@/StaticAssets/green_close.png";

// Animated assets
import glowing_circle from "../../../AnimatedAssets/glowing_circle.json";
import glowing_left_arrows from "../../../AnimatedAssets/glowing_left_arrows.json";
import glowing_right_arrows from "../../../AnimatedAssets/glowing_right_arrows.json";

// Constants
const MAX_MOVE = 200;
const PADDING = 42.5;
const DIRECTION_THRESHOLD = 0.5;
const ACTION_THRESHOLD = 190;

// Asset maps for better organization
const ASSETS = {
  close: { default: white_close, left: red_close, right: green_close },
  accept: { default: white_accept, left: red_check, right: green_check },
  button: { left: red_button, right: green_button },
  leftArrow: { left: red_left_arrow, right: green_left_arrow },
  rightArrow: { left: red_right_arrow, right: green_right_arrow }
} as const;

const GRADIENTS = {
  border: {
    default: `linear-gradient(to right, rgba(252, 66, 51, 0.5) 0%, rgba(252, 66, 51, 0.5) 25%, rgba(255, 238, 146, 1) 50%, rgba(252, 66, 51, 0.5) 75%, rgba(252, 66, 51, 0.5) 100%)`,
    left: `linear-gradient(to right, rgba(98, 22, 49, 1) 0%, rgba(98, 22, 49, 1) 25%, rgba(218, 73, 108, 1) 50%, rgba(98, 22, 49, 1) 75%, rgba(98, 22, 49, 1) 100%)`,
    right: `linear-gradient(to right, rgba(26, 80, 62, 1) 0%, rgba(26, 80, 62, 1) 25%, rgba(64, 198, 134, 1) 50%, rgba(26, 80, 62, 1) 75%, rgba(26, 80, 62, 1) 100%)`
  },
  background: {
    default: '#1f2937',
    left: `linear-gradient(to bottom, rgba(98, 22, 49, 1) 0%, rgba(255, 90, 139, 1) 100%)`,
    right: `linear-gradient(to bottom, rgba(27, 125, 67, 1) 0%, rgba(108, 231, 150, 1) 100%)`
  }
} as const;

const COLORS = {
  text: {
    default: 'white',
    left: 'rgba(128, 32, 55, 1)',
    right: 'rgba(7, 110, 73, 1)'
  }
} as const;

type DragState = 'default' | 'left' | 'right';
type Position = { x: number; y: number };

interface ActionBarProps {
  onDragStateChange?: (state: { 
    isDragingLeft: boolean; 
    isDragingRight: boolean; 
    isDragging: boolean 
  }) => void;
}

export default function ActionBar({ onDragStateChange }: ActionBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>({ x: 0, y: 0 });

  // Calculate current drag state
  const dragState: DragState = useMemo(() => {
    if (position.x < -DIRECTION_THRESHOLD) return 'left';
    if (position.x > DIRECTION_THRESHOLD) return 'right';
    return 'default';
  }, [position.x]);

  const isDragingLeft = dragState === 'left';
  const isDragingRight = dragState === 'right';

  // Memoized style calculations
  const styles = useMemo(() => ({
    borderGradient: GRADIENTS.border[dragState],
    backgroundGradient: GRADIENTS.background[dragState],
    textColor: COLORS.text[dragState]
  }), [dragState]);

  // Memoized asset selections
  const assets = useMemo(() => ({
    closeIcon: ASSETS.close[dragState],
    acceptIcon: ASSETS.accept[dragState],
    buttonIcon: dragState !== 'default' ? ASSETS.button[dragState] : null,
    leftArrowIcon: dragState === "left" ? ASSETS.leftArrow.left : dragState === "right" ? ASSETS.leftArrow.right : undefined,
    rightArrowIcon: dragState === "left" ? ASSETS.rightArrow.left : dragState === "right" ? ASSETS.rightArrow.right : undefined,
  }), [dragState]);

  // Notify parent of drag state changes
  useEffect(() => {
    onDragStateChange?.({ isDragingLeft, isDragingRight, isDragging });
  }, [isDragingLeft, isDragingRight, isDragging, onDragStateChange]);

  // Update position ref when position changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const constrainPosition = useCallback((deltaX: number, deltaY: number): Position => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };

    const rect = container.getBoundingClientRect();
    
    // Apply movement limits
    let newX = Math.max(-MAX_MOVE, Math.min(deltaX, MAX_MOVE));
    let newY = Math.max(-MAX_MOVE, Math.min(deltaY, MAX_MOVE));
    
    // Apply container boundary constraints
    const maxX = rect.width / 2 - PADDING;
    const maxY = rect.height / 2 - PADDING;
    
    newX = Math.max(-maxX, Math.min(newX, maxX));
    newY = Math.max(-maxY, Math.min(newY, maxY));
    
    return { x: newX, y: newY };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!circleRef.current || !containerRef.current) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const newPosition = constrainPosition(deltaX, deltaY);
    setPosition(newPosition);
  }, [isDragging, dragStart, constrainPosition]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    const currentX = positionRef.current.x;

    if (currentX < -ACTION_THRESHOLD) {
      alert('Declined! Circle was dragged to the left.');
    } else if (currentX > ACTION_THRESHOLD) {
      alert('Accepted! Circle was dragged to the right.');
    }

    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
  }, [isDragging]);

  // Set up mouse event listeners
  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const ArrowComponent = ({ 
    isLeft, 
    staticIcon, 
    animationData, 
    className 
  }: {
    isLeft: boolean;
    staticIcon: any;
    animationData: any;
    className: string;
  }) => {
    if (dragState !== 'default') {
      return <Image src={staticIcon} alt={`${isLeft ? 'left' : 'right'} arrow`} className={className} />;
    }
    return <Lottie animationData={animationData} loop className={className} />;
  };

  return (
    <div 
      ref={containerRef}
      className="p-[2.5px] rounded-3xl m-4 mb-7 transition-all duration-200 ease-out"
      style={{ backgroundImage: styles.borderGradient }}
    >
      <div 
        className="rounded-3xl h-20 flex flex-row justify-between items-center text-white w-full transition-all duration-200 ease-out"
        style={{ background: styles.backgroundGradient }}
      >
        <div className="relative flex flex-row justify-center items-center gap-6 ml-[7px]">
          
          {/* Decline Section */}
          <div className="flex flex-row items-center gap-3">
            <Image src={assets.closeIcon} alt="close" className="w-8 h-8" />
            <p className="text-xl" style={{ color: styles.textColor }}>
              Decline
            </p>
          </div>

          {/* Draggable Circle Section */}
          <div className="relative w-[175px] h-[175px] flex justify-center items-center">
            
            {/* Left Arrow */}
            <ArrowComponent
              isLeft={true}
              staticIcon={assets.leftArrowIcon}
              animationData={glowing_left_arrows}
              className="absolute left-0 -translate-x-4 w-14 h-[34px] pointer-events-none"
            />
            
            {/* Right Arrow */}
            <ArrowComponent
              isLeft={false}
              staticIcon={assets.rightArrowIcon}
              animationData={glowing_right_arrows}
              className="absolute right-0 translate-x-4 w-14 h-[34px] pointer-events-none"
            />

            {/* Draggable Circle */}
            <div 
              ref={circleRef}
              className="w-full h-full select-none cursor-grab active:cursor-grabbing"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }}
              onMouseDown={handleMouseDown}
            >
              {assets.buttonIcon ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Image 
                    src={assets.buttonIcon} 
                    alt="button" 
                    className="w-[160px] h-[145px] pointer-events-none pb-2"
                  />
                </div>
              ) : (
                <Lottie
                  animationData={glowing_circle}
                  loop
                  className="w-full h-full pointer-events-none"
                />
              )}
            </div>
          </div>

          {/* Accept Section */}
          <div className="flex flex-row items-center gap-2">
            <p className="text-xl" style={{ color: styles.textColor }}>
              Accept
            </p>
            <Image src={assets.acceptIcon} alt="accept" className="w-8 h-8" />
          </div>
          
        </div>
      </div>
    </div>
  );
}