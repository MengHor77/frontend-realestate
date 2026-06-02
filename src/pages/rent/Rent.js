import React from 'react';

function Rent() {
    return (
        <div className="container mt-4">
            <h2 className="text-primary mb-4 border-bottom pb-2">🏠 អចលនទ្រព្យសម្រាប់ជួល</h2>
            
            {/* ទីតាំងដែលយើងកំណត់ Scrollbar */}
            <div 
                className="row pe-2" 
                style={{ 
                    maxHeight: '65vh', /* កំណត់កម្ពស់ត្រឹម 65% នៃអេក្រង់ (បងអាចដូរជា 500px ក៏បាន) */
                    overflowY: 'auto', /* បង្ហាញ Scrollbar បញ្ឈរនៅពេលមាន Card ច្រើន */
                    overflowX: 'hidden' /* លាក់ Scrollbar ផ្តេក */
                }}
            >
                {/* Card ទី ១ */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                            រូបភាពផ្ទះជួល ១
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-success">$500 / ខែ</h5>
                            <p className="card-text">ខុនដូទំនើប ក្បែរផ្សារទំនើបអ៊ីអន ២</p>
                            <button className="btn btn-outline-primary w-100">មើលព័ត៌មាន</button>
                        </div>
                    </div>
                </div>

                {/* Card ទី ២ (បន្ថែមដើម្បីតេស្ត Scroll) */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                            រូបភាពផ្ទះជួល ២
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-success">$300 / ខែ</h5>
                            <p className="card-text">ផ្ទះល្វែងជិតផ្សារទួលទំពូង</p>
                            <button className="btn btn-outline-primary w-100">មើលព័ត៌មាន</button>
                        </div>
                    </div>
                </div>

                {/* Card ទី ៣ */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                            រូបភាពផ្ទះជួល ៣
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-success">$1200 / ខែ</h5>
                            <p className="card-text">វីឡាភ្លោះបុរីប៉េងហួត</p>
                            <button className="btn btn-outline-primary w-100">មើលព័ត៌មាន</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rent;