import React from 'react';

function Rent() {
    return (
        <div className="container mt-4">
            <h2 className="text-primary mb-4 border-bottom pb-2">🏠 អចលនទ្រព្យសម្រាប់ជួល</h2>
            <div className="row">
                {/* Card ទី ១ */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '200px' }}>រូបភាពផ្ទះជួល</div>
                        <div className="card-body">
                            <h5 className="card-title text-success">$500 / ខែ</h5>
                            <p className="card-text">ខុនដូទំនើប ក្បែរផ្សារទំនើបអ៊ីអន ២</p>
                            <button className="btn btn-outline-primary w-100">មើលព័ត៌មាន</button>
                        </div>
                    </div>
                </div>
                {/* បងអាច Copy បន្ថែម Card ទៀតបាននៅទីនេះ */}
            </div>
        </div>
    );
}

export default Rent;