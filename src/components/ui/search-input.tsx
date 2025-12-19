import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";

import { bindKey } from "@/utils";

type SearchInputProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  debounce?: number;
  className?: string;
  inputClassName?: string;
  placeholderKey?: string;
  placeholder?: string;
};

function SearchInput({
  value,
  onChange,
  debounce = 0,
  placeholderKey,
  placeholder,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");

  const timeout = useRef<number>(undefined);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeout.current);
    setQuery(e.target.value);
    timeout.current = setTimeout(() => {
      onChange(e.target.value);
    }, debounce);
  }

  useEffect(bindKey(inputRef, "k"), []);

  useEffect(() => {
    setQuery(value); // To sync external value changes with internal query
  }, [value]);

  return (
    <InputGroup className="max-w-xs bg-transparent! rounded-md">
      <InputGroupInput
        ref={inputRef}
        placeholder={
          placeholderKey
            ? `Search ${placeholderKey}...`
            : placeholder || "Search ..."
        }
        type="search"
        value={query}
        onChange={handleChange}
        className="bg-transparent"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}

export default SearchInput;
