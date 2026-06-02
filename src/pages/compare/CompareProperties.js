import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCompare } from '../../store/slices/propertySlice';
import { properties } from '../../data/properties';

function CompareProperties() {
  const dispatch = useDispatch();
  const compareIds = useSelector((state) => state.property.compare);
  const compareProperties = properties.filter((item) => compareIds.includes(item.id));

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h5 mb-0">Compare properties</h1>
        <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(clearCompare())}>Clear</button>
      </div>
      {compareProperties.length < 2 ? (
        <p>Select at least 2 properties from Listings to compare.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Field</th>
                {compareProperties.map((property) => <th key={property.id}>{property.title}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr><td>Price</td>{compareProperties.map((property) => <td key={property.id}>${property.price.toLocaleString()}</td>)}</tr>
              <tr><td>Type</td>{compareProperties.map((property) => <td key={property.id}>{property.type}</td>)}</tr>
              <tr><td>Bedrooms</td>{compareProperties.map((property) => <td key={property.id}>{property.bedrooms}</td>)}</tr>
              <tr><td>Bathrooms</td>{compareProperties.map((property) => <td key={property.id}>{property.bathrooms}</td>)}</tr>
              <tr><td>Size</td>{compareProperties.map((property) => <td key={property.id}>{property.size} sqft</td>)}</tr>
              <tr><td>Status</td>{compareProperties.map((property) => <td key={property.id}>{property.status}</td>)}</tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default CompareProperties;
