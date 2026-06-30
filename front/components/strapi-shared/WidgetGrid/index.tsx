import { WidgetCard } from "./WidgetCard";
import { WIDGET_GRID_DATA } from "@/lib/types";

const WidgetGrid = (data: WIDGET_GRID_DATA) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
      {data.widgets.map((widget) => (
        <div key={widget.id} className="w-full" data-company={data.theme}>
          <WidgetCard data={widget} />
        </div>
      ))}
    </div>
  );
};

export default WidgetGrid;