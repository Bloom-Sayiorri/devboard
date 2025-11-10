// components/kanban/board.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	KeyboardSensor,
	PointerActivationConstraint,
} from "@dnd-kit/core";
import {
    useSortable,
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
	rectSortingStrategy,
	sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { SortableItem, SortableColumn, DroppableColumnWrapper } from "./boardhelper"; // helper components below (or inline, see note)
// import React, { useState } from "react";
// import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { uniqueId } from "lodash-es";

type Card = { id: string; title: string; description?: string };

type ColumnsState = Record<string, Card[]>;

const DEFAULT_DATA: ColumnsState = {
	backlog: [
		{ id: "c-1", title: "Collect ideas" },
		{ id: "c-2", title: "Research competitors" },
	],
	todo: [
		{ id: "c-3", title: "Set up DB schema" },
		{ id: "c-4", title: "Create Prisma models" },
	],
	doing: [{ id: "c-5", title: "Implement auth" }],
	done: [{ id: "c-6", title: "Project planning" }],
};

const STORAGE_KEY = "devboard-kanban";

export default function Board() {
	const [columns, setColumns] = useState<ColumnsState>(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			return raw ? JSON.parse(raw) : DEFAULT_DATA;
		} catch {
			return DEFAULT_DATA;
		}
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
	}, [columns]);

	// Sensors: pointer + keyboard
    const sensors = useSensors(
			useSensor(PointerSensor, {
				activationConstraint: {
					distance: 6,
				},
			}),
			useSensor(KeyboardSensor, {
				coordinateGetter: sortableKeyboardCoordinates,
			})
		);
	// Helper: find container and index by id
	const findContainer = (id: string) => {
		for (const key of Object.keys(columns)) {
			if (columns[key].some((c) => c.id === id)) return key;
		}
		return null;
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id as string;
		const overId = over.id as string;

		const fromContainer = findContainer(activeId);
		const toContainer = findContainer(overId) ?? overId; // over can be column id

		if (!fromContainer || !toContainer) return;

		// If dropped onto a column (not a card), append to end
		if (fromContainer === toContainer && activeId === overId) return;

		setColumns((prev) => {
			const sourceList = [...prev[fromContainer]];
			const targetList = fromContainer === toContainer ? sourceList : [...prev[toContainer]];

			// remove from source
			const sourceIndex = sourceList.findIndex((c) => c.id === activeId);
			if (sourceIndex === -1) return prev;
			const [moved] = sourceList.splice(sourceIndex, 1);

			// if dropping on a card: insert at that position
			const overIndex = targetList.findIndex((c) => c.id === overId);

			if (overIndex === -1) {
				// dropped on column (append)
				targetList.push(moved);
			} else {
				targetList.splice(overIndex, 0, moved);
			}

			return {
				...prev,
				[fromContainer]: fromContainer === toContainer ? targetList : sourceList,
				[toContainer]: targetList,
			};
		});
	};

	// Create UI columns array to preserve order
	const columnOrder = Object.keys(columns);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Kanban Board</h2>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{columnOrder.map((columnId) => (
						<DroppableColumnWrapper
							key={columnId}
							id={columnId}
							title={columnId.toUpperCase()}
							cards={columns[columnId]}
							onAddCard={(title) => {
								const newCard: Card = { id: `c-${Date.now()}`, title };
								setColumns((prev) => ({ ...prev, [columnId]: [...prev[columnId], newCard] }));
							}}
						/>
					))}
				</div>
			</DndContext>
		</div>
	);
}

export function SortableItem({ id, title }: { id: string; title: string }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
    } as React.CSSProperties;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white rounded-md shadow p-3 mb-3 cursor-grab hover:shadow-md select-none">
            <div className="text-sm font-medium text-gray-800">{title}</div>
        </div>
    );
}

export function DroppableColumnWrapper({
    id,
    title,
    cards,
    onAddCard,
}: {
    id: string;
    title: string;
    cards: Card[];
    onAddCard: (title: string) => void;
}) {
    const [newTitle, setNewTitle] = useState("");

    return (
        <div className="bg-slate-100 rounded-lg p-3 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
                <span className="text-xs text-slate-500">{cards.length}</span>
            </div>

            <div className="flex-1 overflow-auto pr-2">
                <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                    {cards.map((card) => (
                        <SortableItem key={card.id} id={card.id} title={card.title} />
                    ))}
                </SortableContext>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (newTitle.trim()) {
                        onAddCard(newTitle.trim());
                        setNewTitle("");
                    }
                }}
                className="mt-3">
                <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Add card..."
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </form>
        </div>
    );


}