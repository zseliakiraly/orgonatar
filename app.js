const { useState, useEffect, useMemo, useRef, useCallback } = React;

// --- UTILS & ICONS ---
const IconBase = ({ size = 24, className = "", children, onClick, onMouseDown, style }) => (
    <svg onClick={onClick} onMouseDown={onMouseDown} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style} className={`${className} ${onClick ? 'clickable' : ''}`}>
        {children}
    </svg>
);

const Icons = {
    Music: (props) => <IconBase {...props}><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></IconBase>,
    ListMusic: (props) => <IconBase {...props}><path d="M21 15V6"></path><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path><path d="M12 12H3"></path><path d="M16 6H3"></path><path d="M12 18H3"></path></IconBase>,
    Search: (props) => <IconBase {...props}><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></IconBase>,
    Menu: (props) => <IconBase {...props}><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></IconBase>,
    Plus: (props) => <IconBase {...props}><path d="M5 12h14"></path><path d="M12 5v14"></path></IconBase>,
    ChevronLeft: (props) => <IconBase {...props}><path d="m15 18-6-6 6-6"></path></IconBase>,
    ChevronRight: (props) => <IconBase {...props}><path d="m9 18 6-6-6-6"></path></IconBase>,
    Trash2: (props) => <IconBase {...props}><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></IconBase>,
    Play: (props) => <IconBase {...props}><polygon points="5 3 19 12 5 21 5 3"></polygon></IconBase>,
    SidebarLeft: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="9" x2="9" y1="3" y2="21"></line></IconBase>,
    SidebarRight: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="15" x2="15" y1="3" y2="21"></line></IconBase>,
    Settings: (props) => <IconBase {...props}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></IconBase>,
    Book: (props) => <IconBase {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></IconBase>,
    Info: (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="16" y2="12"></line><line x1="12" x2="12.01" y1="8" y2="8"></line></IconBase>,
    Save: (props) => <IconBase {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></IconBase>,
    Edit: (props) => <IconBase {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></IconBase>,
    GripVertical: (props) => <IconBase {...props}><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></IconBase>,
    CheckSquare: (props) => <IconBase {...props}><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></IconBase>,
    Square: (props) => <IconBase {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></IconBase>,
    X: (props) => <IconBase {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></IconBase>,
    ChevronUp: (props) => <IconBase {...props}><path d="m18 15-6-6-6 6"/></IconBase>,
    ChevronDown: (props) => <IconBase {...props}><path d="m6 9 6 6 6-6"/></IconBase>,
    Star: (props) => <IconBase {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></IconBase>,
    Eye: (props) => <IconBase {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></IconBase>,
    EyeOff: (props) => <IconBase {...props}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></IconBase>,
    LayoutBottom: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="15" y2="15" /></IconBase>,
    LayoutSidebar: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="15" x2="15" y1="3" y2="21" /></IconBase>,
    Columns: (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="12" x2="12" y1="3" y2="21" /></IconBase>,
    List: (props) => <IconBase {...props}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></IconBase>,
    ListOrdered: (props) => <IconBase {...props}><line x1="10" x2="21" y1="6" y2="6"></line><line x1="10" x2="21" y1="12" y2="12"></line><line x1="10" x2="21" y1="18" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></IconBase>,
    Maximize: (props) => <IconBase {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></IconBase>,
};

const parseVerses = (lyrics) => {
    if (!lyrics) return [];
    return lyrics.split(/\n\s*\n/).map((text, index) => {
        const lines = text.split('\n');
        const firstLine = lines[0] || "";
        const match = firstLine.match(/^(\d+\.)\s*(.*)/);
        return { index, label: match ? match[1] : `${index + 1}.`, preview: (match ? match[2] : firstLine).substring(0, 50), fullText: text };
    });
};

// --- TÁROLÁS (localStorage) ---
const STORAGE_KEYS = { playlists: 'orgonista_playlists', settings: 'orgonista_settings' };

const DEFAULT_SETTINGS = { theme: 'papyrus', showLyrics: true, sidebarSide: 'right', lyricsWidth: '15%', scoreMaxWidth: '100%', bookActive: {} };

const loadJSON = (key, fallback) => {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch (e) {
        return fallback;
    }
};

const saveJSON = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error("Mentési hiba:", e); }
};

const loadSettings = () => {
    const stored = loadJSON(STORAGE_KEYS.settings, {});
    const settings = { ...DEFAULT_SETTINGS, ...(typeof stored === 'object' ? stored : {}) };
    if (!settings.bookActive || typeof settings.bookActive !== 'object') settings.bookActive = {};
    return settings;
};

// Az azonosítók a JSON-ban lehetnek számok vagy szövegek is, ezért mindig szövegként hasonlítunk
const sameId = (a, b) => a != null && b != null && String(a) === String(b);

const newItemId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// A listaelem csak az énekszámot tárolja, a címet/szöveget mindig a friss enek.json-ból vesszük.
// A régi formátumú elemeket ({ hymn: {...} }) is átalakítja.
const normalizePlaylists = (raw) => (Array.isArray(raw) ? raw : [])
    .filter(pl => pl && pl.id != null)
    .map(pl => ({
        ...pl,
        name: pl.name || 'Névtelen lista',
        items: (Array.isArray(pl.items) ? pl.items : [])
            .map(item => ({
                id: item.id || newItemId(),
                hymnNumber: String(item.hymnNumber ?? item.hymn?.number ?? ''),
                variationId: item.variationId ?? null,
                preludeId: item.preludeId ?? null,
                verses: Array.isArray(item.verses) ? item.verses : []
            }))
            .filter(item => item.hymnNumber)
    }));

// Kottakönyv állapota: a felhasználó beállítása, ennek hiányában a JSON "active" mezője
const isBookActive = (book, bookActive) => {
    const key = String(book.id);
    return Object.prototype.hasOwnProperty.call(bookActive, key) ? bookActive[key] : book.active !== false;
};

// --- KOMPONENSEK ---

const NavigationSidebar = ({ activeTab, onTabChange, menuSide, toggleFullScreen }) => (
    <div className={`sidebar ${menuSide}`}>
        <div className="sidebar-group">
            <button onClick={() => onTabChange('library')} className={`nav-btn ${activeTab === 'library' ? 'active' : ''}`} title="Könyvtár"><Icons.ListMusic size={26} /></button>
            <button onClick={() => onTabChange('playlists')} className={`nav-btn ${activeTab === 'playlists' || activeTab === 'playlist_editor' ? 'active' : ''}`} title="Listák"><Icons.ListOrdered size={26} /></button>
            <button onClick={() => onTabChange('scorebooks')} className={`nav-btn ${activeTab === 'scorebooks' ? 'active' : ''}`} title="Kottakönyvek"><Icons.Book size={26} /></button>

        </div>
        <div className="sidebar-group">
            <button onClick={toggleFullScreen} className="nav-btn" title="Teljes képernyő"><Icons.Maximize size={24} /></button>
            <button onClick={() => onTabChange('settings')} className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} title="Beállítások"><Icons.Settings size={24} /></button>
            <button onClick={() => onTabChange('about')} className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`} title="Névjegy"><Icons.Info size={24} /></button>
        </div>
    </div>
);

const Modal = ({ title, onClose, children, footer, maxWidth }) => (
    <div className="modal-overlay">
        <div className="modal-box" style={{maxWidth: maxWidth || '500px'}}>
            <div className="modal-header" style={{padding: '0.75rem 1rem'}}>
                <h3 className="font-serif text-lg font-bold text-galaxy">{title}</h3>
                <button onClick={onClose}><Icons.X size={20} className="text-gray-500 hover:text-black"/></button>
            </div>
            <div className="modal-body" style={{padding:'1rem'}}>{children}</div>
            <div className="modal-footer" style={{padding:'0.75rem 1rem'}}>{footer}</div>
        </div>
    </div>
);

const AlertModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
    return (
        <Modal title="Figyelmeztetés" onClose={onClose} footer={<button onClick={onClose} className="btn btn-primary">Rendben</button>}>
            <p className="text-ink text-center">{message}</p>
        </Modal>
    );
};

const FullscreenModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <Modal title="Teljes képernyő" onClose={onClose} footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={onConfirm} className="btn btn-primary">Teljes képernyő</button>
            </>
        }>
            <p className="text-ink">A jobb élmény érdekében javasoljuk a teljes képernyős mód használatát.</p>
        </Modal>
    );
};

const HymnSelectorModal = ({ isOpen, onClose, onSelect, hymnBook }) => {
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);
    useEffect(() => { if(isOpen) { setSearch(''); setTimeout(() => inputRef.current?.focus(), 100); } }, [isOpen]);
    const filtered = useMemo(() => { if (!hymnBook) return []; if (!search) return hymnBook; const lower = search.toLowerCase(); return hymnBook.filter(h => h.number.includes(lower) || h.title.toLowerCase().includes(lower)); }, [search, hymnBook]);
    if (!isOpen) return null;

    return (
        <Modal title="Ének választása" onClose={onClose} footer={null}>
            <div className="hymn-selector-search">
                <Icons.Search className="search-icon" size={18}/>
                <input ref={inputRef} type="text" className="input" placeholder="Keresés..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="hymn-selector-list">
                {filtered.map(h => (
                    <button key={h.number} onClick={() => onSelect(h)} className="hymn-selector-item">
                        <div><span className="hymn-selector-item-hymn-number">#{h.number}</span><span className="hymn-selector-item-hymn-title">{h.title}</span></div>
                        <Icons.Plus size={18} className="icon-plus"/>
                    </button>
                ))}
            </div>
        </Modal>
    );
};

const CreatePlaylistModal = ({ isOpen, onClose, onConfirm }) => {
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    useEffect(() => { if(isOpen) { setName(''); setTimeout(() => inputRef.current?.focus(), 100); } }, [isOpen]);
    if (!isOpen) return null;

    return (
        <Modal title="Új lista létrehozása" onClose={onClose} footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={() => name && onConfirm(name)} disabled={!name} className="btn btn-primary">Létrehozás</button>
            </>
        }>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Lista neve</label>
                <input ref={inputRef} type="text" className="input" placeholder="pl. Vasárnapi mise" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && name && onConfirm(name)} />
            </div>
        </Modal>
    );
};

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if(!isOpen) return null;
    return (
        <Modal title={title || "Törlés"} onClose={onClose} footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={onConfirm} className="btn btn-danger-solid">Törlés</button>
            </>
        }>
            <p className="text-ink">{message}</p>
        </Modal>
    );
};

const CustomSelect = ({ items, currentId, onChange, labelKey = "name", subLabelKey = "composer", placeholder = "Nincs kiválasztva", emptyText = "Nincs adat", width="180px" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const currentItem = items && items.find(v => v.id === currentId);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { setIsOpen(false); }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isEmpty = !items || items.length === 0;

    return (
        <div style={{position:'relative'}} ref={dropdownRef}>
            <button 
                onClick={() => !isEmpty && setIsOpen(!isOpen)} 
                className="input" 
                style={{height:'36px', fontSize:'0.9rem', width:'auto', minWidth: width, textAlign:'left', display:'flex', justifyContent:'space-between', alignItems:'center', cursor: isEmpty ? 'default' : 'pointer', paddingRight:'10px', opacity: isEmpty ? 0.6 : 1, backgroundColor: isEmpty ? 'rgba(0,0,0,0.05)' : 'white'}}
            >
                <span className="truncate">{isEmpty ? emptyText : (currentItem ? currentItem[labelKey] : placeholder)}</span>
                <Icons.ChevronDown size={16} style={{opacity:0.5}}/>
            </button>
            
            {isOpen && !isEmpty && (
                <div style={{position:'absolute', top:'100%', right:0, marginTop:'5px', backgroundColor:'var(--col-papyrus)', border:'1px solid #ccc', borderRadius:'4px', boxShadow:'var(--shadow-xl)', width:'300px', zIndex:100, maxHeight:'300px', overflowY:'auto'}}>
                    <div onClick={() => { onChange(null); setIsOpen(false); }} style={{padding:'10px', borderBottom:'1px solid #eee', cursor:'pointer', fontStyle:'italic', color:'#666'}} className="hover:bg-gray-100">
                        {placeholder}
                    </div>
                    {items.map(v => (
                        <div key={v.id} onClick={() => { onChange(v.id); setIsOpen(false); }} style={{padding:'10px', borderBottom:'1px solid #eee', cursor:'pointer', backgroundColor: currentId === v.id ? 'rgba(0,0,0,0.05)' : 'transparent'}} className="hover:bg-gray-100">
                            <div style={{fontWeight:'bold', fontSize:'0.9rem', color:'var(--col-galaxy-blue)'}}>{v[labelKey]}</div>
                            <div style={{fontSize:'0.75rem', color:'#666', marginTop:'2px'}}>
                                <span style={{fontStyle:'italic'}}>{v[subLabelKey]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const AddToPlaylistModal = ({ isOpen, onClose, onConfirm, playlists, initialVariationId, initialPreludeId, hymn, variations, preludes, defaultPlaylistId, lockPlaylistId }) => {
    if (!isOpen) return null;
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(defaultPlaylistId || (playlists.length > 0 ? playlists[0].id : null));
    const [selectedVariationId, setSelectedVariationId] = useState(initialVariationId);
    const [selectedPreludeId, setSelectedPreludeId] = useState(initialPreludeId);
    const [selectedVerses, setSelectedVerses] = useState([]); 
    const parsedVerses = useMemo(() => parseVerses(hymn.lyrics), [hymn.lyrics]);

    useEffect(() => { 
        if (isOpen) { 
            setSelectedVerses(parsedVerses.map(v => v.index)); 
            if (!initialVariationId && variations && variations.length > 0) setSelectedVariationId(variations[0].id); else setSelectedVariationId(initialVariationId); 
            setSelectedPreludeId(initialPreludeId || (preludes && preludes.length > 0 ? null : null)); 
            if (lockPlaylistId) setSelectedPlaylistId(lockPlaylistId); else if (!selectedPlaylistId && playlists.length > 0) setSelectedPlaylistId(playlists[0].id); 
        } 
    }, [isOpen]);

    const toggleVerse = (index) => { if (selectedVerses.includes(index)) setSelectedVerses(selectedVerses.filter(i => i !== index)); else setSelectedVerses([...selectedVerses, index].sort((a, b) => a - b)); };
    const handleConfirm = () => { if (!selectedPlaylistId) return; onConfirm({ playlistId: selectedPlaylistId, variationId: selectedVariationId, preludeId: selectedPreludeId, verses: selectedVerses }); };

    return (
        <Modal title="Hozzáadás" onClose={onClose} maxWidth="600px" footer={
            <>
                <button onClick={onClose} className="btn">Mégse</button>
                <button onClick={handleConfirm} className="btn btn-primary">Mentés</button>
            </>
        }>
            <div className="text-center pb-2 border-b border-gray-200 mb-4">
                <div className="font-bold text-accent text-lg">#{hymn.number}</div>
                <div className="font-serif font-bold text-galaxy">{hymn.title}</div>
            </div>
            
            <div className="flex flex-col gap-4">
                {!lockPlaylistId && (
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cél lista</label>
                        <select className="input" value={selectedPlaylistId || ''} onChange={(e) => setSelectedPlaylistId(Number(e.target.value))}>
                            {playlists.map(pl => <option key={pl.id} value={pl.id}>{pl.name}</option>)}
                        </select>
                    </div>
                )}
                
                <div style={{display:'flex', gap:'1rem'}}>
                    <div style={{flex:1}}>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Előjáték</label>
                        <CustomSelect items={preludes} currentId={selectedPreludeId} onChange={setSelectedPreludeId} placeholder="Nincs kiválasztva" emptyText="Nincs előjáték" width="100%" />
                    </div>
                    <div style={{flex:1}}>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Változat</label>
                        <CustomSelect items={variations} currentId={selectedVariationId} onChange={setSelectedVariationId} placeholder="Változat választása" width="100%" />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase">Versszakok</label>
                        <button onClick={() => setSelectedVerses(selectedVerses.length === parsedVerses.length ? [] : parsedVerses.map(v => v.index))} className="text-xs text-accent hover:underline">
                            {selectedVerses.length === parsedVerses.length ? "Mégse" : "Mind"}
                        </button>
                    </div>
                    <div style={{maxHeight:'150px', overflowY:'auto', border:'1px solid #ddd', borderRadius:'4px'}}>
                        {parsedVerses.map(verse => (
                            <div key={verse.index} onClick={() => toggleVerse(verse.index)} className={`verse-item ${selectedVerses.includes(verse.index) ? 'selected' : ''}`}>
                                <div className="text-accent">{selectedVerses.includes(verse.index) ? <Icons.CheckSquare size={20} /> : <Icons.Square size={20} />}</div>
                                <div><div className="font-bold text-galaxy text-sm">{verse.label}</div><div className="text-xs text-gray-500">{verse.preview}</div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const SettingsView = ({ settings, onUpdateSettings }) => (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
        <div className="header centered">
             <h1 className="header-title main">Beállítások</h1>
        </div>
        
        <div className="main-content" style={{padding:'2rem', overflowY:'auto'}}>
            <div style={{maxWidth:'800px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'10px'}}>
                
                {/* Kártyák a beállításoknak */}
                <div className="card card-row">
                    <div className="card-decoration"></div>
                    <div style={{width: '600px', minWidth: '200px'}}>
                        <div className="font-bold text-ink">Háttér téma</div>
                        <div className="text-xs text-gray-500">Válassz megjelenítési módot</div>
                    </div>
                    <select className="input" style={{width:'auto', minWidth:'150px'}} value={settings.theme} onChange={(e) => onUpdateSettings({...settings, theme: e.target.value})}>
                        <option value="papyrus">Papirusz</option>
                        <option value="dark-papyrus">Sötét Pergamen</option>
                        <option value="white">Törtfehér</option>
                    </select>
                </div>

                <div className="card card-row">
                    <div className="card-decoration"></div>
                    <div style={{width: '600px', minWidth: '200px'}}>
                        <div className="font-bold text-ink">Szövegpanel megjelenítése</div>
                        <div className="text-xs text-gray-500">Kotta mellett a szöveg láthatósága</div>
                    </div>
                    <button onClick={() => onUpdateSettings({...settings, showLyrics: !settings.showLyrics})} className="btn-ghost" style={{color: settings.showLyrics ? 'var(--col-accent)' : '#ccc'}}>
                        {settings.showLyrics ? <Icons.Eye size={24}/> : <Icons.EyeOff size={24}/>}
                    </button>
                </div>

                <div className="card card-row">
                    <div className="card-decoration"></div>
                    <div style={{width: '600px', minWidth: '200px'}}>
                        <div className="font-bold text-ink">Oldalsáv szélessége</div>
                        <div className="text-xs text-gray-500">Ha oldalt van a szöveg</div>
                    </div>
                    <div className="flex gap-2">
                         <button onClick={() => onUpdateSettings({...settings, lyricsWidth: '15%'})} className={`btn ${settings.lyricsWidth === '15%' ? 'btn-primary' : 'btn-ghost'}`}>15%</button>
                         <button onClick={() => onUpdateSettings({...settings, lyricsWidth: '20%'})} className={`btn ${settings.lyricsWidth === '20%' ? 'btn-primary' : 'btn-ghost'}`}>20%</button>
                         <button onClick={() => onUpdateSettings({...settings, lyricsWidth: '25%'})} className={`btn ${settings.lyricsWidth === '25%' ? 'btn-primary' : 'btn-ghost'}`}>25%</button>
                         <button onClick={() => onUpdateSettings({...settings, lyricsWidth: '30%'})} className={`btn ${settings.lyricsWidth === '30%' ? 'btn-primary' : 'btn-ghost'}`}>30%</button>
                    </div>
                </div>

                <div className="card card-row">
                    <div className="card-decoration"></div>
                    <div style={{width: '600px', minWidth: '200px'}}>
                        <div className="font-bold text-ink">Kotta szélessége</div>
                        <div className="text-xs text-gray-500">Maximális szélesség</div>
                    </div>
                    <select className="input" style={{width:'auto', minWidth:'150px'}} value={settings.scoreMaxWidth || '80%'} onChange={(e) => onUpdateSettings({...settings, scoreMaxWidth: e.target.value})}>
                        <option value="100%">100%</option>
                        <option value="90%">90%</option>
                        <option value="80%">80%</option>
                        <option value="70%">70%</option>
                        <option value="60%">60%</option>
                        <option value="50%">50%</option>
                    </select>
                </div>

                <div className="card card-row">
                    <div className="card-decoration"></div>
                    <div style={{width: '600px', minWidth: '200px'}}>
                         <div className="font-bold text-ink">Oldalmenü helye</div>
                         <div className="text-xs text-gray-500">Bal vagy jobb oldalon legyen a menü</div>
                    </div>
                    <div className="flex gap-2">
                         <button onClick={() => onUpdateSettings({...settings, sidebarSide: 'left'})} className={`btn ${settings.sidebarSide === 'left' ? 'btn-primary' : 'btn-ghost'}`}>Bal</button>
                         <button onClick={() => onUpdateSettings({...settings, sidebarSide: 'right'})} className={`btn ${settings.sidebarSide === 'right' ? 'btn-primary' : 'btn-ghost'}`}>Jobb</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

// --- OSMD KOTTA RENDERELŐ KOMPONENS ---
const OSMD_OPTIONS = {
    autoResize: false, // Mi magunk kezeljük a ResizeObserverrel
    backend: "svg",
    drawTitle: false,
    drawSubtitle: false,
    drawComposer: false,
    drawLyricist: false,
    drawPartNames: false,
    drawPartAbbreviations: false
};

// Az OSMD-nek nincs "engravingRules" opciója: a szabályokat a példány EngravingRules objektumán kell beállítani.
// (Vízszintes térközhöz a VoiceSpacingMultiplierVexflow használható, alapértéke 0.85.)
const OSMD_ENGRAVING_RULES = {
    MinNoteDistance: 6, // Minimum térköz a kottafejek között (az OSMD alapértéke 2)
    PageTopMargin: 10,  // alapérték: 5
    PageBottomMargin: 10
};

const OsmdViewer = ({ fileUrl, zoom = 1.0 }) => {
    const containerRef = useRef(null);
    const osmdRef = useRef(null);
    const zoomRef = useRef(zoom);
    const readyRef = useRef(false);          // az aktuális fájl betöltve, rajzolható
    const renderedWidthRef = useRef(0);
    const loadIdRef = useRef(0);
    const loadQueueRef = useRef(Promise.resolve());
    const [status, setStatus] = useState({ kind: 'loading', text: 'Betöltésre vár...' });

    const renderScore = () => {
        const osmd = osmdRef.current;
        if (!osmd || !readyRef.current || !containerRef.current) return;
        osmd.Zoom = zoomRef.current; // a Zoom setter a gerendákat is újraszámolja
        osmd.render();
        renderedWidthRef.current = containerRef.current.clientWidth;
    };

    // 1. OSMD példány és méretfigyelő: egyszer, a komponens teljes élettartamára
    useEffect(() => {
        const osmd = new window.opensheetmusicdisplay.OpenSheetMusicDisplay(containerRef.current, OSMD_OPTIONS);
        Object.assign(osmd.EngravingRules, OSMD_ENGRAVING_RULES);
        osmdRef.current = osmd;

        let resizeTimeout = null;
        const observer = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Csak szélességváltozásra rajzolunk újra (ablakméret, tablet elforgatása, szövegpanel áthelyezése)
                if (containerRef.current && containerRef.current.clientWidth !== renderedWidthRef.current) renderScore();
            }, 300);
        });
        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            clearTimeout(resizeTimeout);
            loadIdRef.current++; // a még futó betöltés eredményét eldobjuk
            osmdRef.current = null;
        };
    }, []);

    // 2. Fájl betöltése. A betöltések sorban futnak, és csak a legutolsó kérés rajzolódik ki,
    //    így gyors lapozásnál sem kerülhet a képernyőre egy korábbi ének kottája.
    useEffect(() => {
        if (!fileUrl) return;
        const loadId = ++loadIdRef.current;
        readyRef.current = false;
        setStatus({ kind: 'loading', text: 'Fájl letöltése és feldolgozása...' });

        loadQueueRef.current = loadQueueRef.current
            .then(() => {
                const osmd = osmdRef.current;
                if (!osmd || loadId !== loadIdRef.current) return; // közben újabb kérés jött
                return osmd.load(fileUrl).then(() => {
                    if (loadId !== loadIdRef.current) return;
                    readyRef.current = true;
                    renderScore();
                    setStatus(null);
                });
            })
            .catch(err => {
                if (loadId !== loadIdRef.current) return;
                if (osmdRef.current) osmdRef.current.clear(); // ne maradjon kint az előző ének kottája
                setStatus({ kind: 'error', text: `Hiba történt: ${err.message}` });
            });
    }, [fileUrl]);

    // 3. Zoom változásakor újrarajzolás (betöltés közben a betöltés végén érvényesül)
    useEffect(() => {
        zoomRef.current = zoom;
        renderScore();
    }, [zoom]);

    return (
        <div className="osmd-viewer">
            {status && <div className="osmd-status">{status.kind === 'error' ? '⚠️' : '⏳'} {status.text}</div>}
            <div ref={containerRef} className="osmd-container"></div>
        </div>
    );
};

const PAGE_FORWARD_KEYS = ['PageDown', 'ArrowDown', 'ArrowRight'];
const PAGE_BACK_KEYS = ['PageUp', 'ArrowUp', 'ArrowLeft'];

const ScoreViewer = ({ score, variationId, preludeId, lyrics, showLyrics, lyricsWidth, scoreMaxWidth, onNext, onPrev }) => {
    const [textPosition, setTextPosition] = useState('bottom'); 
    const [textLayout, setTextLayout] = useState('columns');
    const [zoom, setZoom] = useState(1.0);
    const scrollerRef = useRef(null);
    const navRef = useRef({});
    navRef.current = { onNext, onPrev };

    const variations = (score && score.variations) || [];
    const variation = variations.find(v => v.id === variationId) || variations[0] || null;
    const prelude = (score && score.preludes && score.preludes.find(p => p.id === preludeId)) || null;

    // Másik ének vagy változat mindig a kotta tetejéről induljon
    useEffect(() => {
        if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
    }, [variation && variation.id, prelude && prelude.id]);

    // Lapozás billentyűzettel vagy Bluetooth lapozópedállal (ezek nyíl- vagy PageUp/PageDown billentyűt küldenek).
    // Előre: ha a kottából van még lent, egy képernyőnyit görget, különben a következő ének jön. Hátra ugyanígy.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
            if (document.querySelector('.modal-overlay')) return;
            if (e.target.closest && e.target.closest('input, select, textarea, [contenteditable="true"]')) return;
            const forward = PAGE_FORWARD_KEYS.includes(e.key);
            if (!forward && !PAGE_BACK_KEYS.includes(e.key)) return;

            const el = scrollerRef.current;
            const step = el ? el.clientHeight * 0.85 : 0;
            const { onNext, onPrev } = navRef.current;
            if (forward) {
                if (el && el.scrollTop + el.clientHeight < el.scrollHeight - 2) el.scrollBy({ top: step, behavior: 'smooth' });
                else if (onNext) onNext();
                else return;
            } else {
                if (el && el.scrollTop > 2) el.scrollBy({ top: -step, behavior: 'smooth' });
                else if (onPrev) onPrev();
                else return;
            }
            e.preventDefault();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!variation && !prelude) return (
        <div style={{display:'flex', height:'100%', alignItems:'center', justifyContent:'center', flexDirection:'column', opacity:0.5}}>
            <Icons.Music size={64}/>
            <p>Nincs elérhető kotta</p>
        </div>
    );

    const isSide = textPosition === 'right';

    return (
        <div style={{display:'flex', height:'100%', flexDirection: isSide ? 'row' : 'column'}}>
            {/* Kotta rész: egyetlen görgethető terület az előjátéknak és a kottának */}
            <div className="score-pane">
                <div ref={scrollerRef} className="score-scroller">
                    
                    {/* Előjáték */}
                    {prelude && (
                        <div className="score-block prelude-block" style={{maxWidth: scoreMaxWidth || '100%'}}>
                            <div className="prelude-label">Előjáték: {prelude.name}</div>
                            {prelude.xmlUrl ? (
                                <OsmdViewer fileUrl={prelude.xmlUrl} zoom={zoom} />
                            ) : (
                                <div className="score-missing">Előjáték kotta helye</div>
                            )}
                        </div>
                    )}

                    {/* Fő Kotta / Variáció */}
                    {variation && (variation.xmlUrl ? (
                        <div className="score-block" style={{maxWidth: scoreMaxWidth || '100%'}}>
                            <OsmdViewer fileUrl={variation.xmlUrl} zoom={zoom} />
                        </div>
                    ) : (
                        <div className="score-placeholder">
                            <Icons.Music size={80} className="text-ink"/>
                            <p className="font-serif mt-4">Kotta helye</p>
                        </div>
                    ))}
                </div>
                 
                {variation && (
                    <div className="score-info">
                        {variation.year} {variation.voiceCount && ` • ${variation.voiceCount} szólam`}
                    </div>
                )}
                {/* Lebegő zoom sáv a kotta alján */}
                <div className="zoom-bar">
                    <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} title="Kicsinyítés">-</button>
                    <span>{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(z => Math.min(2.5, z + 0.1))} title="Nagyítás">+</button>
                </div>
                {/* Lapozó gombok: láthatóak, és nem takarják el a kotta szélét */}
                {onPrev && <button onClick={onPrev} className="page-turn-btn prev" title="Előző ének" aria-label="Előző ének"><Icons.ChevronLeft size={32}/></button>}
                {onNext && <button onClick={onNext} className="page-turn-btn next" title="Következő ének" aria-label="Következő ének"><Icons.ChevronRight size={32}/></button>}
            </div>
            
            {showLyrics && (
                <div style={{
                    width: isSide ? lyricsWidth : '100%', 
                    minWidth: isSide ? '200px' : '100%', 
                    height: isSide ? '100%' : 'auto',
                    minHeight: isSide ? '100%' : '150px',
                    maxHeight: isSide ? '100%' : '50%',
                    display:'flex', 
                    flexDirection:'column', 
                    borderLeft: isSide ? '1px solid #ddd' : 'none', 
                    borderTop: !isSide ? '1px solid #ddd' : 'none',
                    backgroundColor:'var(--col-papyrus)', 
                    zIndex:20, 
                    boxShadow: isSide ? '-5px 0 15px rgba(0,0,0,0.1)' : '0 -5px 15px rgba(0,0,0,0.1)'
                }}>
                    {/* Toolbar */}
                    <div style={{display:'flex', justifyContent:'flex-end', padding:'4px', borderBottom:'1px dashed #eee', gap:'4px'}}>
                         <button onClick={() => setTextPosition(textPosition === 'right' ? 'bottom' : 'right')} className="btn-ghost p-1" title={textPosition === 'right' ? "Lentre tesz" : "Oldalra tesz"}>
                             {textPosition === 'right' ? <Icons.LayoutBottom size={16}/> : <Icons.LayoutSidebar size={16}/>}
                         </button>
                         {textPosition === 'bottom' && (
                             <button onClick={() => setTextLayout(textLayout === 'block' ? 'columns' : 'block')} className="btn-ghost p-1" title={textLayout === 'block' ? "Oszlopos nézet" : "Folyó szöveg"}>
                                 {textLayout === 'block' ? <Icons.Columns size={16}/> : <Icons.List size={16}/>}
                             </button>
                         )}
                    </div>
                    <div style={{
                        flex: 1, 
                        overflowY: (!isSide && textLayout === 'columns') ? 'hidden' : 'auto',
                        overflowX: (!isSide && textLayout === 'columns') ? 'auto' : 'hidden',
                        padding: '1rem'
                    }}>
                        <div style={
                            !isSide && textLayout === 'columns' 
                            ? { display: 'flex', flexDirection: 'row', gap: '2rem', height: '100%' } 
                            : {}
                        }>
                            {parseVerses(lyrics).map(v => (
                                <div key={v.index} style={{
                                    marginBottom: '1rem', 
                                    paddingLeft: '10px', 
                                    borderLeft: '3px solid #eee', 
                                    fontFamily: 'var(--font-serif)', 
                                    lineHeight: '1.4',
                                    whiteSpace: 'pre-line', // a versszakon belüli sortörések megmaradnak
                                    breakInside: 'avoid-column',
                                    flex: (!isSide && textLayout === 'columns') ? '0 0 auto' : 'auto',
                                    width: (!isSide && textLayout === 'columns') ? '300px' : 'auto'
                                }}>
                                    {v.fullText}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PlaylistEditor = ({ playlist, onClose, onRemoveItem, onAddItem, onPlay, onReorder, getScoreInfo }) => {
    const [dragItem, setDragItem] = useState(null);
    const [dragOverItem, setDragOverItem] = useState(null);
    const handleDragStart = (e, index) => { setDragItem(index); e.dataTransfer.effectAllowed = "move"; };
    const handleDragEnter = (e, index) => { setDragOverItem(index); };
    const handleDragEnd = () => { if (dragItem !== null && dragOverItem !== null && dragItem !== dragOverItem) { onReorder(dragItem, dragOverItem); } setDragItem(null); setDragOverItem(null); };

    if (!playlist) return null;
    return (
        <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
            <div className="header">
                 <div style={{flex:1, display:'flex', justifyContent:'flex-start'}}>
                    <button onClick={() => window.history.back()} style={{color: 'var(--col-papyrus)'}}><Icons.ChevronLeft size={24}/></button>
                 </div>
                 <div style={{flex:2, display:'flex', justifyContent:'center'}}>
                    <h1 className="header-title main">{playlist.name}</h1>
                 </div>
                 <div style={{flex:1, display:'flex', justifyContent:'flex-end'}}>
                    <button onClick={() => onPlay(playlist)} className="btn btn-success"><Icons.Play size={20} /> Lejátszás</button>
                 </div>
            </div>
            
            <div className="main-content" style={{padding:'2rem', overflowY:'auto'}}>
                {playlist.items.length === 0 ? (
                    <div className="playlist-editor-empty">
                        <Icons.ListMusic size={64} className="icon"/>
                        <p>Üres lista</p>
                        <button onClick={onAddItem} className="text-accent font-bold hover:underline mt-2">Adj hozzá egy éneket!</button>
                    </div>
                ) : (
                    <div style={{maxWidth:'1000px', width:'100%', margin:'0 auto', display:'flex', flexDirection:'column', gap:'10px'}}>
                         {playlist.items.map((item, idx) => {
                             const isDragging = idx === dragItem;
                             const isDragOver = idx === dragOverItem;
                             const { variationName, preludeName } = getScoreInfo(item.hymn.scoreId, item.variationId, item.preludeId);
                             
                             return (
                                <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, idx)} onDragEnter={(e) => handleDragEnter(e, idx)} onDragEnd={handleDragEnd} onDragOver={(e) => e.preventDefault()} 
                                     className="playlist-editor-item"
                                     style={{opacity: isDragging ? 0.5 : 1, borderTop: isDragOver && !isDragging ? '2px solid #B58900' : '1px solid #ddd'}}>
                                    <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                                        <div style={{cursor:'move', color:'#ccc'}}><Icons.GripVertical size={20} /></div>
                                        <div style={{fontWeight:'bold', color:'#ccc', width:'20px'}}>{idx + 1}.</div>
                                        <div>
                                            <div><span className="text-accent font-bold">#{item.hymn.number}</span> <span className="font-bold text-ink">{item.hymn.title}</span></div>
                                            <div style={{fontSize:'12px', color:'#666', marginTop:'2px'}}>
                                                {preludeName ? <span className="text-accent">Előjáték: {preludeName} + </span> : ''}
                                                Változat: {variationName} • {item.verses.length} versszak
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveItem(item.id)} className="btn-danger"><Icons.Trash2 size={20} /></button>
                                </div>
                             );
                         })}
                    </div>
                )}
                <div style={{textAlign:'center', marginTop:'2rem'}}>
                    <button onClick={onAddItem} className="btn playlist-editor-add-btn"><Icons.Plus size={20}/> Új ének hozzáadása</button>
                </div>
            </div>
        </div>
    );
};



// --- FŐ ALKALMAZÁS ---
function OrganistApp() {
    // NAVIGÁCIÓS ÁLLAPOT: csak azonosítók, az objektumokat mindig a friss adatokból számoljuk
    const [activeTab, setActiveTab] = useState('library');
    const [selectedHymnNumber, setSelectedHymnNumber] = useState(null);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [playingPlaylistId, setPlayingPlaylistId] = useState(null);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [scorebooks, setScorebooks] = useState([]);

    // Selection States
    const [currentVariationId, setCurrentVariationId] = useState(null);
    const [currentPreludeId, setCurrentPreludeId] = useState(null);

    // STORAGE STATE (induláskor a localStorage-ból töltjük)
    const [playlists, setPlaylists] = useState(() => normalizePlaylists(loadJSON(STORAGE_KEYS.playlists, [])));
    const [settings, setSettings] = useState(loadSettings);

    // DATA STATE
    const [hymnBook, setHymnBook] = useState([]);
    const [loading, setLoading] = useState(true);

    // MODAL STATES
    const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isHymnSelectorOpen, setIsHymnSelectorOpen] = useState(false);
    const [targetPlaylistId, setTargetPlaylistId] = useState(null);
    const [pendingHymnToAdd, setPendingHymnToAdd] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [playlistToDelete, setPlaylistToDelete] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(true);

    // LOAD DATA & PERSISTENCE
    useEffect(() => {
        setLoading(true);
        const idobelyeg = new Date().getTime();
        
        Promise.all([
            fetch(`./data/enek.json?t=${idobelyeg}`).then(res => res.ok ? res.json() : []),
            fetch(`./data/kottakonyvek.json?t=${idobelyeg}`).then(res => res.ok ? res.json() : [])  
        ])
        .then(eredmenyek => {
            setHymnBook(eredmenyek[0]);
            setScorebooks(eredmenyek[1]); // <-- setScores helyett most már a könyveket mentjük
            setLoading(false);
        })
        .catch(err => {
            console.error("Adatbetöltési hiba:", err);
            setAlertMessage("Hiba a JSON fájlok betöltésekor.");
            setLoading(false);
        });
    }, []);

    // NAVIGÁCIÓ: minden nézetváltás egy history-bejegyzés, a vissza gomb ezt állítja vissza.
    // A bejegyzés csak azonosítókat tárol, ezért a kezelőnek nincs szüksége a friss adatokra.
    const applyNavState = useCallback((state) => {
        const s = state || {};
        setActiveTab(s.activeTab || 'library');
        setSelectedHymnNumber(s.selectedHymnNumber ?? null);
        setSelectedPlaylistId(s.selectedPlaylistId ?? null);
        setPlayingPlaylistId(s.playingPlaylistId ?? null);
        setPlayerIndex(s.playerIndex || 0);
    }, []);

    const navigate = (state) => {
        window.history.pushState(state, '');
        applyNavState(state);
    };

    useEffect(() => {
        // Újratöltéskor a böngésző megőrzi a history.state-et, így ugyanoda térünk vissza
        if (window.history.state && window.history.state.activeTab) applyNavState(window.history.state);
        else window.history.replaceState({ activeTab: 'library' }, '');

        const handlePopState = (event) => applyNavState(event.state);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [applyNavState]);

    const goToPlayerIndex = (index) => {
        setPlayerIndex(index);
        window.history.replaceState({ ...window.history.state, playerIndex: index }, '');
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error(err));
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    };
    // A kottakönyvek ki-/bekapcsolását a beállításokban tároljuk, így újratöltés után is megmarad
    const toggleBookActive = (book) => {
        setSettings(prev => ({
            ...prev,
            bookActive: { ...prev.bookActive, [String(book.id)]: !isBookActive(book, prev.bookActive) }
        }));
    };

    const activeScores = useMemo(() => {
        const grouped = {};

        // Csak azokat a könyveket nézzük, amik nincsenek kikapcsolva
        scorebooks.filter(b => isBookActive(b, settings.bookActive)).forEach(book => {
            (book.scores || []).forEach(score => {
                const linkId = (score.scoreId || score.hymnId || score.id || "").toString();
                if (!linkId) return;
                
                if (!grouped[linkId]) {
                    grouped[linkId] = {
                        id: linkId,
                        variations: [],
                        preludes: [] 
                    };
                }
                
                const composerName = score.composer || book.author || '';
                const details = `${composerName} ${score.voiceCount ? `• ${score.voiceCount} szólam` : ''} ${score.year ? `• ${score.year}` : ''}`.trim();

                const variation = {
                    id: `${book.id}_${score.id}`,
                    name: score.name || book.title,
                    xmlUrl: score.xmlUrl,
                    voiceCount: score.voiceCount,
                    composer: details,
                    year: score.year || book.year
                };
                
                if (score.type === 'prelude') {
                    grouped[linkId].preludes.push(variation);
                } else {
                    grouped[linkId].variations.push(variation);
                }
                
                if (score.preludes && Array.isArray(score.preludes)) {
                     grouped[linkId].preludes.push(...score.preludes.map(p => ({
                         ...p,
                         id: `${book.id}_${score.id}_pre_${p.id}`,
                         composer: p.composer || details
                     })));
                }
            });

            (book.preludes || []).forEach(prelude => {
                const linkId = (prelude.scoreId || prelude.hymnId || prelude.id || "").toString();
                if (!linkId) return;

                if (!grouped[linkId]) {
                    grouped[linkId] = {
                        id: linkId,
                        variations: [],
                        preludes: []
                    };
                }

                const composerName = prelude.composer || book.author || '';
                const details = `${composerName} ${prelude.year ? `• ${prelude.year}` : ''}`.trim();

                const preludeItem = {
                    id: `${book.id}_pre_${prelude.id}`,
                    name: prelude.name || book.title,
                    xmlUrl: prelude.xmlUrl,
                    composer: details,
                    year: prelude.year || book.year
                };

                grouped[linkId].preludes.push(preludeItem);
            });
        });
        
        return Object.values(grouped);
    }, [scorebooks, settings.bookActive]);

    // Save persistence (a kezdőállapot már a tárolt adat, így nem írunk felül semmit)
    useEffect(() => { saveJSON(STORAGE_KEYS.playlists, playlists); }, [playlists]);
    useEffect(() => { saveJSON(STORAGE_KEYS.settings, settings); }, [settings]);

    // Származtatott adatok
    const hymnByNumber = useMemo(() => new Map(hymnBook.map(h => [String(h.number), h])), [hymnBook]);
    const selectedHymn = selectedHymnNumber != null ? hymnByNumber.get(String(selectedHymnNumber)) || null : null;

    const resolveItem = (item) => ({
        ...item,
        hymn: hymnByNumber.get(String(item.hymnNumber)) || { number: item.hymnNumber, title: 'Ismeretlen ének', lyrics: '', scoreId: null }
    });

    const selectedPlaylist = useMemo(() => {
        const pl = playlists.find(p => sameId(p.id, selectedPlaylistId));
        return pl ? { ...pl, items: pl.items.map(resolveItem) } : null;
    }, [playlists, selectedPlaylistId, hymnByNumber]);

    const playerQueue = useMemo(() => {
        const pl = playlists.find(p => sameId(p.id, playingPlaylistId));
        return pl ? pl.items.map(resolveItem) : [];
    }, [playlists, playingPlaylistId, hymnByNumber]);
    const currentPlayerIndex = Math.min(playerIndex, Math.max(playerQueue.length - 1, 0));
    const playerItem = playerQueue[currentPlayerIndex] || null;

    // Ha egy nézethez hiányzik az adat (pl. törölt lista), üres képernyő helyett a listákra esünk vissza
    let view = activeTab;
    if (view === 'playlist_editor' && !selectedPlaylist) view = 'playlists';
    if (view === 'player' && playerQueue.length === 0) view = 'playlists';

    // Apply Themes
    const themeColors = {
        'papyrus': { bg: '#FDF6E3', text: '#2a2a2a', sidebar: '#002B36', accent: '#B58900' },
        'dark-papyrus': { bg: '#d4cebc', text: '#1a1a1a', sidebar: '#001e26', accent: '#8a6800' },
        'white': { bg: '#f9fafb', text: '#111827', sidebar: '#1f2937', accent: '#2563eb' }
    };
    const currentTheme = themeColors[settings.theme] || themeColors['papyrus'];

    // Update Selection when Hymn Changes
    useEffect(() => {
        if (!selectedHymn) return;
        const score = getScoreById(selectedHymn.scoreId);
        setCurrentVariationId(score && score.variations.length > 0 ? score.variations[0].id : null);
        setCurrentPreludeId(null); // Reset prelude on song change
    }, [selectedHymn, activeScores]);

    const getScoreById = (scoreId) => {
        if (!scoreId) return null;
        return activeScores.find(s => s.id.toString() === scoreId.toString()) || null;
    };
    const getScoreInfo = (scoreId, varId, preId) => {
        const score = getScoreById(scoreId);
        if(!score) return { scoreName: '?', variationName: '?', variationComposer: '?', preludeName: null };
        const variation = score.variations ? score.variations.find(v => v.id === varId) : null;
        const prelude = score.preludes ? score.preludes.find(p => p.id === preId) : null;
        return { 
            scoreName: score.name, 
            variationName: variation ? variation.name : '?', 
            variationComposer: variation?.composer,
            preludeName: prelude ? prelude.name : null
        };
    }
    
    const filteredHymns = useMemo(() => {
        if (!searchQuery) return hymnBook;
        const lower = searchQuery.toLowerCase();
        return hymnBook.filter(h => h.number.includes(lower) || h.title.toLowerCase().includes(lower) || (h.lyrics && h.lyrics.toLowerCase().includes(lower)));
    }, [searchQuery, hymnBook]);

    // Handlers (minden módosítás csak a playlists állapotot írja, a nézetek ebből számolnak)
    const handleCreatePlaylist = (name) => {
        setPlaylists(prev => [...prev, { id: Date.now(), name, items: [] }]);
        setIsCreateListModalOpen(false);
    };

    const handleAddToPlaylist = ({ playlistId, variationId, preludeId, verses }) => {
        const hymn = pendingHymnToAdd || selectedHymn;
        if (!hymn) return;
        const item = { id: newItemId(), hymnNumber: String(hymn.number), variationId, preludeId, verses };
        setPlaylists(prev => prev.map(p => sameId(p.id, playlistId) ? { ...p, items: [...p.items, item] } : p));
        setIsAddModalOpen(false);
        setPendingHymnToAdd(null);
    };

    const confirmDeleteItem = () => {
        if (!itemToDelete) return;
        const { playlistId, itemId } = itemToDelete;
        setPlaylists(prev => prev.map(p => sameId(p.id, playlistId) ? { ...p, items: p.items.filter(it => it.id !== itemId) } : p));
        setItemToDelete(null);
    };

    const confirmDeletePlaylist = () => { if (!playlistToDelete) return; setPlaylists(prev => prev.filter(p => !sameId(p.id, playlistToDelete.id))); setPlaylistToDelete(null); }
    const handleRemoveItemRequest = (playlistId, itemId) => { setItemToDelete({ playlistId, itemId }); };
    const handleRemovePlaylistRequest = (playlist) => { setPlaylistToDelete(playlist); }
    const handleReorderPlaylist = (fromIndex, toIndex) => {
        setPlaylists(prev => prev.map(p => {
            if (!sameId(p.id, selectedPlaylistId)) return p;
            const items = [...p.items];
            const [movedItem] = items.splice(fromIndex, 1);
            items.splice(toIndex, 0, movedItem);
            return { ...p, items };
        }));
    };

    const startPlaylist = (pl) => {
        if(!pl.items.length) { setAlertMessage("Ez a lista üres, nem lehet elindítani."); return; }
        navigate({ activeTab: 'player', playingPlaylistId: pl.id, playerIndex: 0 });
    };

    const openPlaylistEditor = (pl) => navigate({ activeTab: 'playlist_editor', selectedPlaylistId: pl.id });
    const handleAddHymnToEditor = () => { setIsHymnSelectorOpen(true); };
    const handleHymnSelected = (hymn) => {
        setIsHymnSelectorOpen(false);
        setPendingHymnToAdd(hymn);
        setTargetPlaylistId(selectedPlaylistId);
        setTimeout(() => setIsAddModalOpen(true), 100);
    };

    if (loading) return <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'white'}}>Betöltés...</div>;
    
    // --- RENDER ---
    return (
        <div className="app-root" style={{ '--col-papyrus': currentTheme.bg, '--col-ink': currentTheme.text, '--col-galaxy-blue': currentTheme.sidebar, '--col-accent': currentTheme.accent }}>
            <NavigationSidebar
                activeTab={view}
                onTabChange={(t) => navigate({ activeTab: t })}
                menuSide={settings.sidebarSide}
                toggleFullScreen={toggleFullScreen} 
            />
            
            <div className="main-content">
                {/* Modals */}
                <AlertModal isOpen={!!alertMessage} onClose={() => setAlertMessage(null)} message={alertMessage} />
                <FullscreenModal 
                    isOpen={isFullscreenModalOpen} 
                    onClose={() => setIsFullscreenModalOpen(false)} 
                    onConfirm={() => {
                        toggleFullScreen();
                        setIsFullscreenModalOpen(false);
                    }} 
                />
                <CreatePlaylistModal isOpen={isCreateListModalOpen} onClose={() => setIsCreateListModalOpen(false)} onConfirm={handleCreatePlaylist} />
                <HymnSelectorModal isOpen={isHymnSelectorOpen} onClose={() => setIsHymnSelectorOpen(false)} onSelect={handleHymnSelected} hymnBook={hymnBook} />
                <DeleteConfirmModal isOpen={!!itemToDelete} onClose={() => setItemToDelete(null)} onConfirm={confirmDeleteItem} title="Ének törlése" message="Biztosan el szeretnéd távolítani ezt az éneket a listáról?" />
                <DeleteConfirmModal isOpen={!!playlistToDelete} onClose={() => setPlaylistToDelete(null)} onConfirm={confirmDeletePlaylist} title="Lista törlése" message={`Biztosan törölni szeretnéd a(z) "${playlistToDelete?.name}" listát?`} />
                
                {isAddModalOpen && (pendingHymnToAdd || selectedHymn) && (
                    <AddToPlaylistModal 
                        isOpen={isAddModalOpen} 
                        onClose={() => setIsAddModalOpen(false)} 
                        onConfirm={handleAddToPlaylist} 
                        playlists={playlists}
                        initialVariationId={pendingHymnToAdd ? null : currentVariationId}
                        initialPreludeId={pendingHymnToAdd ? null : currentPreludeId}
                        lockPlaylistId={targetPlaylistId} 
                        defaultPlaylistId={targetPlaylistId} 
                        hymn={pendingHymnToAdd || selectedHymn} 
                        variations={getScoreById((pendingHymnToAdd || selectedHymn).scoreId)?.variations || []}
                        preludes={getScoreById((pendingHymnToAdd || selectedHymn).scoreId)?.preludes || []}
                    />
                )}

                {/* Content Views */}
                {view === 'settings' && <SettingsView settings={settings} onUpdateSettings={setSettings} />}

                {view === 'about' && (
                    <div className="about-view">
                        <div className="icon-container"><Icons.Music size={40}/></div>
                        <h1 className="font-serif font-bold text-3xl text-galaxy mb-2">Református Kottagyűjtemény</h1>
                        <p className="text-accent uppercase font-bold tracking-widest mb-8">Fazekas Márton</p>
                         <div className="content-box">
                            <p>Református énekek orgonakíséretei, a 2021-es énekeskönyvhöz igazítva. Több korálkönyvből válogattam, elsősorban saját használatra - így számos kíséret kimaradt, például a "művészi" B letétek a genfi korálkönyvből.</p>
                        </div>
                    </div>
                )}

                {view === 'playlist_editor' && <PlaylistEditor playlist={selectedPlaylist} onRemoveItem={(itemId) => handleRemoveItemRequest(selectedPlaylist.id, itemId)} onAddItem={handleAddHymnToEditor} onPlay={startPlaylist} onReorder={handleReorderPlaylist} getScoreInfo={getScoreInfo} />}

                {view === 'library' && (selectedHymn ? (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header">
                            {/* Left: Number + Title */}
                            <div style={{display:'flex', alignItems:'center', gap:'12px', flex:1}}>
                                <button onClick={() => window.history.back()} style={{color: 'rgba(255,255,255,0.8)'}}><Icons.ChevronLeft size={24}/></button>
                                <div style={{display:'flex', alignItems:'baseline', gap:'8px'}}>
                                    <h2 className="font-serif font-bold text-2xl text-accent">{selectedHymn.number}</h2>
                                    <h3 className="font-bold text-lg text-ink truncate">{selectedHymn.title}</h3>
                                </div>
                            </div>
                            
                            {/* Right: Selectors */}
                            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                {(() => { 
                                    const score = getScoreById(selectedHymn.scoreId); 
                                    if(!score) return null;
                                    return (
                                        <>
                                            <CustomSelect items={score.preludes} currentId={currentPreludeId} onChange={setCurrentPreludeId} placeholder="Előjáték választása" emptyText="Nincs előjáték" width="160px" />
                                            <CustomSelect items={score.variations} currentId={currentVariationId} onChange={setCurrentVariationId} placeholder="Változat választása" width="180px" />
                                            <button onClick={() => { setTargetPlaylistId(null); setPendingHymnToAdd(null); setIsAddModalOpen(true); }} className="btn btn-primary" title="Hozzáadás listához"><Icons.Plus size={20} /></button>
                                        </>
                                    ); 
                                })()}
                            </div>
                        </div>
                        <div style={{flex:1, overflow:'hidden'}}>
                            <ScoreViewer score={getScoreById(selectedHymn.scoreId)} variationId={currentVariationId} preludeId={currentPreludeId} lyrics={selectedHymn.lyrics} showLyrics={settings.showLyrics} lyricsWidth={settings.lyricsWidth} scoreMaxWidth={settings.scoreMaxWidth}/>
                        </div>
                    </div>
                ) : (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header centered">
                            <h1 className="header-title main">Református Kottagyűjtemény</h1>
                        </div>
                        <div style={{padding:'0.5rem 1rem', borderBottom:'1px solid #ddd', backgroundColor:'rgba(0,0,0,0.02)'}}>
                            <div style={{position:'relative', width:'100%', maxWidth:'600px', margin:'0 auto'}}>
                                <Icons.Search style={{position:'absolute', top:'10px', left:'12px', color:'#999', pointerEvents:'none'}} size={20}/>
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Keresés..." className="input" style={{paddingLeft:'40px', width:'100%', height:'40px'}}/>
                            </div>
                        </div>
                        <div style={{flex:1, overflowY:'auto', padding:'1rem'}}>
                            {filteredHymns.map(h => (
                                <div key={h.number} onClick={() => navigate({ activeTab: 'library', selectedHymnNumber: h.number })} className="card list-item">
                                    <div className="card-decoration"></div>
                                    <div style={{flex:1, display: 'flex', alignItems: 'center'}}>
                                        <span className="text-accent font-bold text-lg" style={{minWidth: '3.5rem', textAlign: 'right', marginRight: '1.5rem'}}>{h.number}</span>
                                        <span className="font-bold text-ink">{h.title}</span>
                                    </div>
                                    <Icons.ChevronRight style={{color:'#ccc'}}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {view === 'playlists' && (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header">
                            <div style={{flex:1}}></div>
                            <h1 className="header-title main">Liturgikus Listák</h1>
                            <div style={{flex:1, display:'flex', justifyContent:'flex-end'}}>
                                <button onClick={() => setIsCreateListModalOpen(true)} className="btn btn-primary"><Icons.Plus size={20}/> Új lista</button>
                            </div>
                        </div>
                        {playlists.length === 0 ? (
                            <div className="playlist-editor-empty">
                                <Icons.ListMusic size={64} className="icon"/>
                                <p>Még nincsenek listák</p>
                                <button onClick={() => setIsCreateListModalOpen(true)} className="text-accent font-bold hover:underline mt-2">Hozz létre egyet!</button>
                            </div>
                        ) : (
                            <div style={{flex:1, overflowY:'auto', padding:'2rem', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem'}}>
                                {playlists.map(pl => (
                                    <div key={pl.id} onClick={() => openPlaylistEditor(pl)} className="card clickable">
                                        <div className="card-decoration"></div>
                                        <div className="playlist-card-header">
                                            <h3 className="font-serif font-bold text-galaxy">{pl.name}</h3>
                                            <div className="flex gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); openPlaylistEditor(pl); }} className="btn-ghost" title="Szerkesztés"><Icons.Edit size={18}/></button>
                                                <button onClick={(e) => { e.stopPropagation(); handleRemovePlaylistRequest(pl); }} className="btn-danger" title="Törlés"><Icons.Trash2 size={18}/></button>
                                            </div>
                                        </div>
                                        <div style={{flex:1, overflowY:'auto', padding:'0.5rem'}}>
                                            {pl.items.map(resolveItem).map((it, idx) => (<div key={it.id} className="playlist-card-item"><span className="text-accent font-bold">{idx+1}.</span><span>{it.hymn.number}</span> <span>{it.hymn.title}</span></div>))}
                                        </div>
                                        <div style={{padding:'1rem', borderTop:'1px solid #ddd'}}>
                                            <button onClick={(e) => { e.stopPropagation(); startPlaylist(pl); }} className="btn playlist-card-start-btn"><Icons.Play /> INDÍTÁS</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {view === 'scorebooks' && (
                    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                        <div className="header centered">
                            <h1 className="header-title main">Kottakönyvek</h1>
                        </div>

                        <div className="main-content" style={{padding:'1rem', overflowY:'auto'}}>
                            <p textAlign="center">
                                Kapcsold ki azokat a könyveket, amiknek a kottáit nem szeretnéd látni.
                            </p>

                            {/* ÜRES ÁLLAPOT KEZELÉSE */}
                            {scorebooks.length === 0 && (
                                <div className="card list-item scorebook-empty">
                                    <div className="card-decoration" style={{ backgroundColor: 'var(--col-red)' }}></div>
                                    <div className="text-center">
                                        <h3 className="font-bold">Még nincsenek kottakönyvek betöltve!</h3>
                                        <p className="text-sm">Ellenőrizd a data/kottakonyvek.json fájlt.</p>
                                    </div>
                                </div>
                            )}

                            {/* KÖNYVEK LISTÁZÁSA */}
                            <div className="scorebook-list">
                            {scorebooks.map(book => {
                                const isActive = isBookActive(book, settings.bookActive);
                                return (
                                    <div key={book.id} className={`card list-item scorebook-item ${!isActive ? 'inactive' : ''}`}>
                                        <div className="card-decoration"></div>
                                        
                                        <div className="scorebook-content">
                                            <div className="scorebook-header">
                                                <h3 className="font-bold text-ink scorebook-title">{book.title}</h3>
                                                <label className="toggle-switch scorebook-toggle">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={isActive} 
                                                        onChange={() => toggleBookActive(book)}
                                                    />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>

                                            <div className="scorebook-details">
                                                <div>{book.scores?.length || 0} db letét, {book.preludes?.length || 0} db előjáték</div>
                                                <strong>{book.author || 'Ismeretlen'}</strong>
                                            </div>
                                            
                                            {book.description && (
                                                <div className="scorebook-description">{book.description}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            </div>
                        </div>
                    </div>
                )}

                
                {view === 'player' && playerItem && (
                    <div className="player-view">
                        <div className="header">
                            <div style={{display:'flex', alignItems:'center', gap:'12px', flex:1}}>
                                <button onClick={() => window.history.back()} className="btn-ghost" style={{color:'var(--col-ink)', padding:0}}><Icons.ChevronLeft size={24} /></button>
                                <div style={{display:'flex', alignItems:'baseline', gap:'8px', flexWrap: 'wrap'}}>
                                    <h2 className="font-serif font-bold text-2xl text-accent">{playerItem.hymn.number}</h2>
                                    <h3 className="font-bold text-lg truncate">{playerItem.hymn.title}</h3>
                                    {/* Header Info: Aligned center vertically now */}
                                    {(() => {
                                        const { variationName, variationComposer, preludeName } = getScoreInfo(playerItem.hymn.scoreId, playerItem.variationId, playerItem.preludeId);
                                        return <div className="text-xs opacity-70 border-l border-gray-500 pl-3 ml-2" style={{display:'flex', gap:'5px', alignItems:'baseline'}}>
                                            {preludeName && <span className="font-bold text-accent">[{preludeName}]</span>}
                                            <span>{variationName}</span>
                                            <span style={{fontStyle:'italic'}}> - {variationComposer}</span>
                                        </div>;
                                    })()}
                                </div>
                            </div>
                            
                            <div style={{textAlign:'right', minWidth:'50px'}}>
                                <div className="text-sm opacity-50 mt-1">{currentPlayerIndex+1} / {playerQueue.length}</div>
                            </div>
                        </div>

                        <div style={{flex:1, overflow:'hidden', position:'relative'}}>
                            <ScoreViewer
                                score={getScoreById(playerItem.hymn.scoreId)}
                                variationId={playerItem.variationId}
                                preludeId={playerItem.preludeId}
                                lyrics={(() => {
                                    const allV = parseVerses(playerItem.hymn.lyrics);
                                    if(playerItem.verses.length === 0) return playerItem.hymn.lyrics;
                                    return allV.filter(v => playerItem.verses.includes(v.index)).map(v => v.fullText).join('\n\n');
                                })()}
                                showLyrics={settings.showLyrics}
                                lyricsWidth={settings.lyricsWidth}
                                scoreMaxWidth={settings.scoreMaxWidth}
                                onNext={currentPlayerIndex < playerQueue.length - 1 ? () => goToPlayerIndex(currentPlayerIndex + 1) : null}
                                onPrev={currentPlayerIndex > 0 ? () => goToPlayerIndex(currentPlayerIndex - 1) : null}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<OrganistApp />);
