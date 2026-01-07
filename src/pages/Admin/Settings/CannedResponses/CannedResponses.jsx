import { useState, useEffect } from "react";
import NewResponse from "./NewResponse";
import AllResponses from "./AllResponses";
import { Search, MessageSquare } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";
import { initialResponses } from "../../../../data/CannedResponsedata";

const Main = () => {
  const { isDark } = useTheme();
  const [responses, setResponses] = useState(initialResponses);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Filter responses based on search
  const filteredResponses = responses.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.message.toLowerCase().includes(search.toLowerCase())
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSave = (form, editing) => {
    if (!form.title.trim() || !form.message.trim()) return;

    if (editing) {
      setResponses(
        responses.map((r) =>
          r.id === editing ? { ...r, ...form } : r
        )
      );
    } else {
      setResponses([
        ...responses,
        { id: Date.now(), ...form },
      ]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this response?")) {
      setResponses(responses.filter((r) => r.id !== id));
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Canned Response Manager
              </h1>
              <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Streamline your support workflow with ready-to-use response templates
              </p>
            </div>
            
           
           
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              placeholder="Search responses by title or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`block w-full pl-10 pr-4 py-3.5 rounded-xl 
                ${isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                } border focus:ring-2 focus:border-transparent transition-all`}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor Panel */}
          <div className="lg:col-span-1">
            <NewResponse 
              onSave={handleSave} 
              isDark={isDark} 
              responses={responses}
              setResponses={setResponses}
            />
          </div>

          {/* Responses List */}
          <div className="lg:col-span-2">
            <AllResponses
              responses={responses}
              filteredResponses={filteredResponses}
              onDelete={handleDelete}
              isDark={isDark}
              search={search}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;