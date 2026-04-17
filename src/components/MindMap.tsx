import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { MindMapNode } from '../types';

interface MindMapProps {
  nodes: MindMapNode[];
}

interface D3Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  depth: number;
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  source: string | D3Node;
  target: string | D3Node;
}

export const MindMap: React.FC<MindMapProps> = ({ nodes }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !nodes.length) return;

    const width = svgRef.current.clientWidth;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Prepare data
    const d3Nodes: D3Node[] = [];
    const d3Links: D3Link[] = [];

    const nodeMap = new Map<string, D3Node>();

    // Basic breadth-first depth calculation could be better, but we'll assume the input structure
    nodes.forEach((n, index) => {
      const d3N: D3Node = { id: n.id, label: n.label, depth: 1 };
      d3Nodes.push(d3N);
      nodeMap.set(n.id, d3N);
    });

    nodes.forEach(n => {
      n.children.forEach(childLabel => {
        // Find if child label matches any node label, else create a leaf
        const targetNode = d3Nodes.find(dn => dn.label === childLabel);
        if (targetNode) {
          d3Links.push({ source: n.id, target: targetNode.id });
        } else {
          const leafId = `leaf-${Math.random()}`;
          const leafNode: D3Node = { id: leafId, label: childLabel, depth: 2 };
          d3Nodes.push(leafNode);
          d3Links.push({ source: n.id, target: leafId });
        }
      });
    });

    const simulation = d3.forceSimulation(d3Nodes)
      .force('link', d3.forceLink(d3Links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    const link = g.append('g')
      .attr('stroke', '#333')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(d3Links)
      .join('line')
      .attr('stroke-width', 2);

    const node = g.append('g')
      .selectAll('g')
      .data(d3Nodes)
      .join('g')
      .call(drag(simulation) as any);

    node.append('circle')
      .attr('r', d => d.depth === 1 ? 8 : 5)
      .attr('fill', d => d.depth === 1 ? '#FF0000' : '#FFB84D')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    node.append('text')
      .attr('x', 12)
      .attr('y', 4)
      .text(d => d.label)
      .attr('fill', '#fff')
      .style('font-size', '12px')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 1px 2px rgba(0,0,0,0.8)');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    return () => {
      simulation.stop();
    };
  }, [nodes]);

  return (
    <div className="w-full bg-charcoal/30 rounded-xl border border-white/5 overflow-hidden">
      <svg ref={svgRef} className="w-full h-[600px]" />
    </div>
  );
};
