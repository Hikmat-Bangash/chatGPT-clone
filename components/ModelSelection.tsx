"use client";
import useSWR from 'swr';
import Select from 'react-select';

const fetchSelection = () => fetch("/api/getEngines").then((res) => res.json());

const ModelSelection = () => {

    const { data: models, isLoading } = useSWR("models", fetchSelection);
    const { data: model, mutate: setModel } = useSWR("model", {
        fallbackData: 'text-davinci-003'
    })

  return (
      <div>
          <Select
              className='mt-2'
              options={models?.modelOptions}
              defaultInputValue={model}
              placeholder={model}
              isSearchable
              isLoading={isLoading}
              menuPosition="fixed"
              classNames={{
                  control: (state) => "bg-gray border-white",
              }}
            //   onChange={(e) => setModel((e.value))}
          />
              
    </div>
  )
}

export default ModelSelection