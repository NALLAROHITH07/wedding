import React, { useMemo, useState } from "react";
import { vendorCategories, cities as cityList } from "./vendorData";

function VendorAddServicePage() {
	const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
	const [form, setForm] = useState({
		type: "venues",
		subcategory: "",
		name: "",
		city: "",
		location: "",
		price: "",
		vegPrice: "",
		nonVegPrice: "",
		capacity: "",
		rooms: "",
		rentalCost: "",
		venueTypes: "",
		image: "",
		services: "",
		features: ""
	});
	const [toast, setToast] = useState("");

	const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

	const typeOptions = useMemo(() => Object.keys(vendorCategories), []);
	const subcategoryOptions = useMemo(() => {
		switch (form.type) {
			case 'venues':
				return ["Banquet Halls", "Marriage Garden / Lawns", "Wedding Resorts", "Small Function / Party Halls", "Destination Wedding Venues", "Kalyana Mandapams", "4 Star & Above Wedding Hotels"];
			case 'photographers':
				return ["Photo Only", "Video Only", "Photo + Video"];
			case 'makeup':
				return ["Bridal Makeup", "Family Makeup"];
			case 'catering':
				return ["Catering Services", "Cakes & Desserts", "Chaat & Food Stalls"];
			default:
				return ["General"];
		}
	}, [form.type]);

	const showVenueFields = form.type === 'venues';
	const showPhotographerFields = form.type === 'photographers';
	const showMakeupFields = form.type === 'makeup';
	const showCateringFields = form.type === 'catering';

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(API_BASE + "/vendor-services", {
				method: "POST",
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
				body: JSON.stringify({
					...form,
					venueTypes: form.venueTypes ? form.venueTypes.split(",").map((s) => s.trim()) : [],
					features: form.features ? form.features.split(",").map((s) => s.trim()) : []
				})
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Failed to add service");
			setToast("Service added successfully");
			setTimeout(() => setToast(""), 2000);
		} catch (e) {
			setToast(e.message);
			setTimeout(() => setToast(""), 2000);
		}
	};

	return (
		<div className="signup-container">
			{toast && (
				<div className="success-toast" style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#fff', padding: '10px 16px', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 1000 }}>{toast}</div>
			)}
			<div className="signup-card">
				<h2>Add Service</h2>
				<p className="signup-subtitle">Provide details about your offering</p>
				<form onSubmit={onSubmit}>
					<div className="form-row">
						<div className="form-group">
							<label>Type</label>
							<select value={form.type} onChange={(e) => update("type", e.target.value)}>
								{typeOptions.map(t => (
									<option key={t} value={t}>{vendorCategories[t]?.title || t}</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label>Subcategory</label>
							<select value={form.subcategory} onChange={(e) => update("subcategory", e.target.value)}>
								<option value="">Select</option>
								{subcategoryOptions.map(s => (
									<option key={s} value={s}>{s}</option>
								))}
							</select>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group">
							<label>Name</label>
							<input value={form.name} onChange={(e) => update("name", e.target.value)} required />
						</div>
						<div className="form-group">
							<label>City</label>
							<select value={form.city} onChange={(e) => update("city", e.target.value)} required>
								<option value="">Select city</option>
								{cityList.map((c) => (<option key={c} value={c}>{c}</option>))}
							</select>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group">
							<label>Location</label>
							<input value={form.location} onChange={(e) => update("location", e.target.value)} />
						</div>
						<div className="form-group">
							<label>Image URL</label>
							<input value={form.image} onChange={(e) => update("image", e.target.value)} />
						</div>
					</div>

					{showPhotographerFields && (
						<div className="form-row">
							<div className="form-group">
								<label>Package Price</label>
								<input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="e.g., ₹80,000 per day" />
							</div>
							<div className="form-group">
								<label>Services</label>
								<input value={form.services} onChange={(e) => update("services", e.target.value)} placeholder="Photo + Video" />
							</div>
						</div>
					)}

					{showMakeupFields && (
						<div className="form-row">
							<div className="form-group">
								<label>Package Price</label>
								<input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="e.g., ₹25,000 per day" />
							</div>
							<div className="form-group">
								<label>Services</label>
								<input value={form.services} onChange={(e) => update("services", e.target.value)} placeholder="Bridal Makeup + Hair" />
							</div>
						</div>
					)}

					{showCateringFields && (
						<div className="form-row">
							<div className="form-group">
								<label>Veg Price</label>
								<input value={form.vegPrice} onChange={(e) => update("vegPrice", e.target.value)} placeholder="₹700 per plate" />
							</div>
							<div className="form-group">
								<label>Non-Veg Price</label>
								<input value={form.nonVegPrice} onChange={(e) => update("nonVegPrice", e.target.value)} placeholder="₹900 per plate" />
							</div>
						</div>
					)}

					{showVenueFields && (
						<>
							<div className="form-row">
								<div className="form-group">
									<label>Veg Price</label>
									<input value={form.vegPrice} onChange={(e) => update("vegPrice", e.target.value)} placeholder="₹1,700 per plate" />
								</div>
								<div className="form-group">
									<label>Non-Veg Price</label>
									<input value={form.nonVegPrice} onChange={(e) => update("nonVegPrice", e.target.value)} placeholder="₹1,900 per plate" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group">
									<label>Capacity</label>
									<input value={form.capacity} onChange={(e) => update("capacity", e.target.value)} placeholder="e.g., 250-700 pax" />
								</div>
								<div className="form-group">
									<label>Rooms</label>
									<input value={form.rooms} onChange={(e) => update("rooms", e.target.value)} placeholder="e.g., 10" />
								</div>
							</div>
							<div className="form-row">
								<div className="form-group">
									<label>Rental Cost</label>
									<input value={form.rentalCost} onChange={(e) => update("rentalCost", e.target.value)} placeholder="₹1,10,000" />
								</div>
								<div className="form-group">
									<label>Venue Types (comma separated)</label>
									<input value={form.venueTypes} onChange={(e) => update("venueTypes", e.target.value)} placeholder="Banquet Halls, Wedding Resorts" />
								</div>
							</div>
						</>
					)}

					{!showPhotographerFields && !showMakeupFields && !showVenueFields && !showCateringFields && (
						<div className="form-row">
							<div className="form-group">
								<label>Price</label>
								<input value={form.price} onChange={(e) => update("price", e.target.value)} />
							</div>
							<div className="form-group">
								<label>Services Summary</label>
								<input value={form.services} onChange={(e) => update("services", e.target.value)} />
							</div>
						</div>
					)}

					<div className="form-row">
						<div className="form-group">
							<label>Features (comma separated)</label>
							<input value={form.features} onChange={(e) => update("features", e.target.value)} />
						</div>
						<div className="form-group">
							<label>Notes / Services</label>
							<input value={form.services} onChange={(e) => update("services", e.target.value)} />
						</div>
					</div>

					<button className="vendor-primary-btn" style={{ width: '100%', marginTop: 12 }}>Submit</button>
				</form>
			</div>
		</div>
	);
}

export default VendorAddServicePage;


