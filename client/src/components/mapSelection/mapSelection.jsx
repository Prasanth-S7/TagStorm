import { maps } from "../../common/common";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/8bit/card";

export const MapSelection = ({ onMapSelect }) => {
    const [selectedMap, setSelectedMap] = useState(null);

    const handleSelect = (map) => {
        setSelectedMap(map.sceneKey);
        onMapSelect(map);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4">
            <h2 className="text-white text-3xl mb-10 tracking-widest uppercase font-pixel">
                Select Territory
            </h2>
                <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
                    {maps.map((map) => {
                        const isSelected = selectedMap === map.sceneKey;
                        
                        return (
                            <Card
                                key={map.sceneKey}
                                onClick={() => handleSelect(map)}
                                className={`cursor-pointer transition-all duration-200 transform  w-lg
                                    ${isSelected 
                                        ? "ring-4 ring-yellow-400 scale-105 bg-slate-800" 
                                        : "hover:scale-[1.02] hover:bg-slate-900"
                                    }`}
                            >
                                <CardHeader className="p-0 overflow-hidden">
                                    <div className="relative h-44 w-full">
                                        <img
                                            src={map.tileMapImage}
                                            alt={map.name}
                                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                                                isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                                            }`}
                                        />
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold uppercase">
                                                Active
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="p-4">
                                    <CardTitle className={`text-xl text-center mb-2 ${isSelected ? "text-yellow-400" : "text-white"}`}>
                                        {map.name}
                                    </CardTitle>
                                    <p className="text-gray-400 text-sm leading-snug line-clamp-2">
                                        {map.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
            </div>
        </div>
    );
};