"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/API/axiosInstance";
import { isAxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AIType {
  _id: string;
  name: string;
  description: string;
}

interface AIData {
  _id: string;
  data: string;
  type: {
    _id: string;
    name: string;
  };
}

const AITrainingPage = () => {

  const [types, setTypes] = useState<AIType[]>([]);
  const [data, setData] = useState<AIData[]>([]);

  const [typeForm, setTypeForm] = useState({ name: "", description: "" });
  const [editingType, setEditingType] = useState<string | null>(null);

  const [dataForm, setDataForm] = useState({ type: "", text: "" });
  const [editingDataId, setEditingDataId] = useState<string | null>(null);

  const [, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");
      const [typesRes, dataRes] = await Promise.all([
        axiosInstance.get("/type"),
        axiosInstance.get("/data"),
      ]);
      setTypes(typesRes.data.data || []);
      setData(dataRes.data.data || []);
    } catch (err) {
      console.error("Failed to fetch AI data:", err);
      setError("Could not load AI training data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description } = typeForm;
    if (!name || !description) return alert("Name and description are required.");

    try {
      if (editingType) {
        await axiosInstance.put(`/type/update/${editingType}`, { name, description });
        alert("Type updated successfully!");
      } else {
        await axiosInstance.post("/type/add", { name, description });
        alert("Type created successfully!");
      }
      setTypeForm({ name: "", description: "" });
      setEditingType(null);
      fetchAll();
    } catch (err) {
      if (isAxiosError(err)) alert(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleEditType = (type: AIType) => {
    setEditingType(type._id);
    setTypeForm({ name: type.name, description: type.description });
  };

  const handleDeleteType = async (id: string) => {
    try {
      await axiosInstance.delete(`/type/delete/${id}`);
      alert("Type and all associated data deleted successfully!");
      fetchAll();
    } catch (err) {
      if (isAxiosError(err)) alert(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { type, text } = dataForm;
    if (!type || !text) return alert("Please select a type and provide data content.");

    try {
      if (editingDataId) {
        await axiosInstance.put(`/data/update/${editingDataId}`, { text });
        alert("Data updated successfully!");
      } else {
        await axiosInstance.post("/data/add", { type, text });
        alert("Data created successfully!");
      }
      setDataForm({ type: "", text: "" });
      setEditingDataId(null);
      fetchAll();
    } catch (err) {
      if (isAxiosError(err)) alert(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleEditData = (dataItem: AIData) => {
    setEditingDataId(dataItem._id);
    setDataForm({ type: dataItem.type._id, text: dataItem.data });
  };

  const handleDeleteData = async (id: string) => {
    try {
      await axiosInstance.delete(`/data/delete/${id}`);
      alert("Data entry deleted successfully!");
      fetchAll();
    } catch (err) {
      if (isAxiosError(err)) alert(err.response?.data?.message || "An error occurred.");
    }
  };


  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-4xl font-orbitron tracking-widest text-border-white font-bold mb-8">
        AI Knowledge Base Management
      </h1>

      {error && <p className="text-red-500 bg-red-950/30 p-3 rounded-md mb-6">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold font-orbitron text-border-white tracking-widest">Manage Types</h2>
          <form onSubmit={handleTypeSubmit} className="bg-black/20 p-6 rounded-lg border border-gray-700 space-y-4">
            <h3 className="text-xl font-bold mb-2">{editingType ? "Edit Type" : "Create New Type"}</h3>
            <div>
              <Label htmlFor="typeName">Type Name</Label>
              <Input id="typeName" value={typeForm.name} onChange={(e) => setTypeForm({...typeForm, name: e.target.value})} placeholder="e.g., Pricing" />
            </div>
            <div>
              <Label htmlFor="typeDesc">Description</Label>
              <Textarea id="typeDesc" value={typeForm.description} onChange={(e) => setTypeForm({...typeForm, description: e.target.value})} placeholder="e.g., Information about service costs" />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-gray-600 hover:bg-gray-200 duration-500 hover:text-gray-900 px-4 py-2 rounded-md font-semibold">{editingType ? "Update Type" : "Create Type"}</button>
              {editingType && <button type="button" onClick={() => { setEditingType(null); setTypeForm({ name: "", description: "" }); }} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md">Cancel</button>}
            </div>
          </form>

          <div className="space-y-3">
            {types.map(type => (
              <div key={type._id} className="bg-gray-800/50 p-3 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-bold">{type.name}</p>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEditType(type)} className="bg-yellow-400 hover:bg-yellow-300 text-black py-1 px-2 rounded text-sm">Edit</button>
                  <button onClick={() => handleDeleteType(type._id)} className="bg-red-500 bg:text-red-400 py-1 px-2 rounded text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- DATA MANAGEMENT SECTION --- */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold font-orbitron text-border-white tracking-widest">Manage Data</h2>
          <form onSubmit={handleDataSubmit} className="bg-black/20 p-6 rounded-lg border border-gray-700 space-y-4">
            <h3 className="text-xl font-bold mb-2">{editingDataId ? "Edit Data Entry" : "Create New Data Entry"}</h3>
            <div>
              <Label htmlFor="dataType">Select Type</Label>
              <select id="dataType" value={dataForm.type} onChange={(e) => setDataForm({...dataForm, type: e.target.value})} className="w-full p-2 rounded bg-gray-900 border-gray-600 text-white">
                <option value="">-- Choose a Type --</option>
                {types.map(type => <option key={type._id} value={type._id}>{type.name}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="text">Data Content</Label>
              <Textarea id="text" value={dataForm.text} onChange={(e) => setDataForm({...dataForm, text: e.target.value})} placeholder="Enter the information for the AI..." rows={5} />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-gray-600 hover:bg-gray-200 hover:text-gray-900 px-4 py-2 rounded-md font-semibold">{editingDataId ? "Update Data" : "Create Data"}</button>
              {editingDataId && <button type="button" onClick={() => { setEditingDataId(null); setDataForm({ type: "", text: "" }); }} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md">Cancel</button>}
            </div>
          </form>

          <div className="space-y-3">
            {data.map(item => (
              <div key={item._id} className="bg-gray-800/50 p-3 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-bold text-blue-300 text-sm">Type: {item.type.name}</p>
                  <p className="text-gray-300 mt-1">{item.data}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEditData(item)} className="bg-yellow-400 hover:bg-yellow-300 text-black py-1 px-2 rounded text-sm">Edit</button>
                  <button onClick={() => handleDeleteData(item._id)} className="bg-red-500 hover:bg-red-400 py-1 px-2 rounded text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITrainingPage;
