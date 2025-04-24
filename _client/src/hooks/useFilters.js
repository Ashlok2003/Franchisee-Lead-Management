import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useFilters = () => {
    const [filters, setFilters] = useState({
        searchQuery: '',
        locationQuery: '',
        leadTypeFilter: '',
        leadSourceFilter: '',
        leadUpdateStatusFilter: '',
    });

    const debouncedSetFilter = useDebouncedCallback((key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }, 300);

    const clearFilters = () => {
        setFilters({
            searchQuery: '',
            locationQuery: '',
            leadTypeFilter: '',
            leadSourceFilter: '',
            leadUpdateStatusFilter: '',
        });
    };

    return { filters, setFilter: debouncedSetFilter, clearFilters };
};

export default useFilters;
